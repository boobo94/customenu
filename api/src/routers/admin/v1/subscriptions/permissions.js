import statusCodes from '../../../utils/statusCodes';
import { DecodeJWT } from '../../../utils/jwt';
import { findOneWithDetails } from '../../../../database/services/subscription';

export async function checkAccessToSubscriptions(req, res, next) {
  try {
    const { restaurantId } = DecodeJWT(req.headers.authorization);
    if (restaurantId !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: res.__('FORBIDDEN') });
    }
  } catch (err) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }

  return next();
}

export async function checkAccessToDeleteSubscription(req, res, next) {
  try {
    const subscription = await findOneWithDetails(req.params.subscriptionId);
    if (!subscription) {
      return res.status(statusCodes.NOT_FOUND).send({ error: res.__('RESOURCE_NOT_FOUND') });
    } if (subscription.restaurant.id !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: res.__('FORBIDDEN') });
    }
  } catch (err) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }

  return next();
}
