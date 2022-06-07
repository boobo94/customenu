import stripe from 'stripe';
import { findOneWithDetails } from '../../../../database/services/subscription';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const subscription = await findOneWithDetails(req.params.subscriptionId);

    const stripeClient = stripe(process.env.SECRET_KEY);
    const session = await stripeClient.checkout.sessions.create({
      mode: 'subscription',
      customer_email: subscription.admin.email,
      line_items: [
        {
          price: req.body.refferenceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.ADMIN_URL}/subscription`, // todo: update the url
      cancel_url: `${process.env.ADMIN_URL}/subscription`,
    });

    return res.status(statusCodes.OK).send({
      url: session.url,
    });
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
