import Stripe from 'stripe';
// eslint-disable-next-line import/named
import { sequelize } from '../../../../database/models';
import { findByEmail } from '../../../../database/services/admin';
import * as restaurantService from '../../../../database/services/restaurant';
import * as subscriptionService from '../../../../database/services/subscription';
import * as paymentService from '../../../../database/services/payment';
import * as subscriptionPlanService from '../../../../database/services/subscription-plan';
import { PAYMENT_STATUS } from '../../../../database/models/payment';

async function createSubscription(event) {
  const subscriptionPlan = await subscriptionPlanService.findeByReference(event.plan.id);
  const restaurant = await restaurantService.findByCustomer(event.customer);

  return subscriptionService.create({
    startDate: event.status === 'active' ? new Date(event.current_period_start * 1000) : new Date(),
    endDate: event.status === 'active' ? new Date(event.current_period_end * 1000) : new Date(),
    referenceId: event.id,
    canceled: event.cancel_at_period_end,
    subscriptionPlanId: subscriptionPlan.id,
    restaurantId: restaurant.id,
  });
}

async function updateSubscription(event) {
  return subscriptionService.updateByReference({
    startDate: event.status === 'active' ? new Date(event.current_period_start * 1000) : new Date(),
    endDate: event.status === 'active' ? new Date(event.current_period_end * 1000) : new Date(),
    canceled: event.cancel_at_period_end,
  }, event.id);
}

async function cancelSubscription(event) {
  return subscriptionService.updateByReference({
    startDate: new Date(event.current_period_start * 1000),
    endDate: new Date(event.canceled_at * 1000),
    canceled: true,
  }, event.id);
}

async function attachCustomerIdToRestaurant(event) {
  const admin = await findByEmail(event.email);

  return restaurantService.update({
    customerReference: event.id,
  }, admin.restaurantId);
}

function getInvoiceStatus(status) {
  switch (status) {
    case 'paid':
      return PAYMENT_STATUS.paid;

    case 'void':
    case 'uncollectible':
      return PAYMENT_STATUS.failed;

    case 'draft':
    case 'open':
    default:
      return PAYMENT_STATUS.pending;
  }
}

async function createPayment(event) {
  const restaurant = await restaurantService.findByCustomer(event.customer);

  return paymentService.create({
    status: getInvoiceStatus(event.status),
    amount: event.total / 100, // trim the cents
    currency: event.currency,
    referenceId: event.id,
    restaurantId: restaurant.id,
  });
}

async function updatePayment(event) {
  const subscription = await subscriptionService.findeByReference(event.subscription);

  return sequelize.transaction(async (t) => {
    const updatedPayment = {
      status: getInvoiceStatus(event.status),
      subscriptionId: subscription.id,
    };

    const currentPayment = await paymentService.findeByReference(event.id);

    // if the company is from Romania use the taxId, else use the vat number taxId
    const withVat = currentPayment.restaurant.countryId !== 182;

    // get lastInvoice
    const lastInvoice = await paymentService.findLastInvoice(withVat, t);

    if (updatedPayment.status === PAYMENT_STATUS.paid && lastInvoice !== currentPayment.id) {
      updatedPayment.invoiceNumber = lastInvoice.invoiceNumber + 1;
    }

    if (withVat) {
      updatedPayment.vatAmount = subscription.subscriptionPlan.vatAmount;
    }

    return paymentService.update(updatedPayment, currentPayment.id, t);
  });
}

export default async (req, res) => {
  let event = req.body;

  // Get the signature sent by Stripe
  const signature = req.headers['stripe-signature'];

  try {
    event = Stripe.webhooks.constructEvent(req.body, signature, process.env.WEBHOOK_SECRET_KEY);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error Stripe Webhook: ', e);
    return res.sendStatus(400);
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created': {
        await createSubscription(event.data.object);
        break;
      }
      case 'customer.subscription.updated': {
        await updateSubscription(event.data.object);
        break;
      }
      case 'customer.subscription.deleted': {
        await cancelSubscription(event.data.object);

        break;
      }
      case 'customer.created': {
        await attachCustomerIdToRestaurant(event.data.object);
        break;
      }
      case 'invoice.created': {
        await createPayment(event.data.object);
        break;
      }
      case 'invoice.paid': {
        await updatePayment(event.data.object);
        break;
      }
      case 'invoice.payment_failed': {
        await updatePayment(event.data.object);
        break;
      }
      // ... handle other event types
      default:
        // eslint-disable-next-line no-console
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    return res.send({
      received: true,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error Stripe Webhook: ', e);
    return res.sendStatus(400);
  }
};
