import Stripe from 'stripe';
import { findByEmail } from '../../../../database/services/admin';
import * as restaurants from '../../../../database/services/restaurant';
import * as subscriptions from '../../../../database/services/subscription';
import { findeByreference } from '../../../../database/services/subscription-plan';

async function createSubscription(event) {
  const subscriptionPlan = await findeByreference(event.plan.id);
  const restaurant = await restaurants.findByCustomer(event.customer);

  return subscriptions.create({
    startDate: new Date(event.current_period_start * 1000),
    endDate: new Date(event.current_period_end * 1000),
    referenceId: event.id,
    canceled: event.cancel_at_period_end,
    subscriptionPlanId: subscriptionPlan.id,
    restaurantId: restaurant.id,
  });
}

async function updateSubscription(event) {
  return subscriptions.updateByreference({
    startDate: new Date(event.current_period_start * 1000),
    endDate: new Date(event.current_period_end * 1000),
    canceled: event.cancel_at_period_end,
  }, event.id);
}

async function cancelSubscription(event) {
  return subscriptions.updateByreference({
    startDate: new Date(event.current_period_start * 1000),
    endDate: new Date(event.canceled_at * 1000),
    canceled: true,
  }, event.id);
}

async function attachCustomerIdToRestaurant(event) {
  const admin = await findByEmail(event.email);

  return restaurants.update({
    customerReference: event.id,
  }, admin.restaurantId);
}

export default async (req, res) => {
  let event = req.body;

  // Get the signature sent by Stripe
  const signature = req.headers['stripe-signature'];

  try {
    event = Stripe.webhooks.constructEvent(req.body, signature, process.env.WEBHOOK_SECRET_KEY);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.sendStatus(400);
  }

  console.log('event', event.data.object);

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
      const invoice = event.data.object;
      // Then define and call a function to handle the event invoice.created
      break;
    }
    case 'invoice.paid': {
      const invoice = event.data.object;
      // Then define and call a function to handle the event invoice.paid
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      // Then define and call a function to handle the event invoice.payment_failed
      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  return res.send({
    received: true,
  });
};
