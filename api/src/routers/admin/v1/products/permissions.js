import statusCodes from '../../../utils/statusCodes';
import errors from '../../../../locales/errors.json';
import { DecodeJWT } from '../../../utils/jwt';
import { countProductsOfRestaurant, findOneOfRestaurantsByIdSimple } from '../../../../database/services/product';
import { findActiveWithPlanByRestaurant } from '../../../../database/services/subscription';

export async function checkAccessToProductsOfRestaurant(req, res, next) {
  try {
    const { restaurantId } = DecodeJWT(req.headers.authorization);
    if (restaurantId !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: errors.FORBIDDEN });
    }
  } catch (err) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }

  return next();
}

export async function checkAccessToProduct(req, res, next) {
  try {
    const product = await findOneOfRestaurantsByIdSimple(
      req.params.productId,
      req.params.restaurantId,
    );
    if (!product) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }
    if (!(product.category
      && product.category.restaurantId === req.params.restaurantId)) {
      return res.status(statusCodes.FORBIDDEN).send({ error: errors.FORBIDDEN });
    }
  } catch (err) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }

  return next();
}

export async function checkAccessToAddProductAsRestaurant(req, res, next) {
  try {
    // check if restaurant has an active subscription
    const subscription = await findActiveWithPlanByRestaurant(req.params.restaurantId);
    if (!subscription) {
      return res.status(statusCodes.CONFLICT).send({ error: res.__('NOT_ACTIVE_SUBSCRIPTION') });
    }

    const totalProductsOfRestaurant = await countProductsOfRestaurant(req.params.restaurantId);
    if (subscription.subscriptionPlan.maxProducts === totalProductsOfRestaurant) {
      return res.status(statusCodes.CONFLICT).send({ error: res.__('SUBSCRIPTION_MAX_LIMIT') });
    }
  } catch (err) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }

  return next();
}
