import stripe from 'stripe';
import { findOneWithDetails, update } from '../../../../database/services/subscription';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const subscription = await findOneWithDetails(req.params.subscriptionId);
    if (!subscription) {
      return res.status(statusCodes.NOT_FOUND).send({ error: res.__('RESOURCE_NOT_FOUND') });
    }

    if (subscription.subscriptionPlan.amount === 0) {
      await update({
        endDate: new Date(),
        canceled: true,
      }, req.params.subscriptionId);
    } else {
      const stripeClient = stripe(process.env.SECRET_KEY);
      await stripeClient
        .subscriptions
        .update(subscription.referenceId, { cancel_at_period_end: true });
    }

    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
