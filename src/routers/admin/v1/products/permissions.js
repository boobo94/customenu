import statusCodes from '../../../utils/statusCodes';
import errors from '../../../../locales/errors.json';
import { DecodeJWT } from '../../../utils/jwt';
import { Controllers } from '../../../../database';

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
    const product = await Controllers.product.findOneOfRestaurantsByIdSimple(
      req.params.productId, req.params.restaurantId,
    );
    if (!product) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    } if (product.restaurantId !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: errors.FORBIDDEN });
    }
  } catch (err) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }

  return next();
}
