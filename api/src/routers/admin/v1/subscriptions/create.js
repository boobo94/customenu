import { DateTime } from 'luxon';
import stripe from 'stripe';
import { findOne } from '../../../../database/services/admin';
import { create } from '../../../../database/services/subscription';
import { findeByReference } from '../../../../database/services/subscription-plan';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const subscriptionPlan = await findeByReference(req.body.referenceId);
    if (!subscriptionPlan) {
      return res.status(statusCodes.NOT_FOUND).send({ error: res.__('RESOURCE_NOT_FOUND') });
    }

    const admin = await findOne(req.adminId);

    // check if is the free plan and add the subscription
    if (subscriptionPlan.amount === 0) {
      const newSubscription = await create({
        startDate: DateTime.now().toJSDate(),
        endDate: DateTime
          .now()
          .plus({ [subscriptionPlan.interval]: subscriptionPlan.recurrence }).toJSDate(),
        subscriptionPlanId: subscriptionPlan.id,
        restaurantId: req.params.restaurantId,
        referenceId: 'free',
      });
      return res.status(statusCodes.OK).send(newSubscription);
    }

    // create new subscription in Stripe
    const stripeClient = stripe(process.env.SECRET_KEY);
    const session = await stripeClient.checkout.sessions.create({
      mode: 'subscription',
      customer_email: admin.email,
      client_reference_id: req.params.restaurantId,
      line_items: [
        {
          price: req.body.referenceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.ADMIN_URL}/subscription`,
      cancel_url: `${process.env.ADMIN_URL}/subscription`,
    });

    return res.status(statusCodes.OK).send({
      url: session.url,
    });
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
