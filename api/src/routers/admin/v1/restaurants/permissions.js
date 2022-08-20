import statusCodes from '../../../utils/statusCodes';
import { DecodeJWT } from '../../../utils/jwt';

// eslint-disable-next-line import/prefer-default-export
export async function checkAccessToRestaurant(req, res, next) {
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
