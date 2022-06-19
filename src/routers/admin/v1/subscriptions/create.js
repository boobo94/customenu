import stripe from 'stripe';
import { findOne } from '../../../../database/services/admin';
import { findeByReference } from '../../../../database/services/subscription-plan';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const subscriptionPlan = await findeByReference(req.body.referenceId);
    if (!subscriptionPlan) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }

    const admin = await findOne(req.adminId);

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
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
