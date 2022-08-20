import statusCodes from '../../../../utils/statusCodes';
import { findByIdAndRestaurantId } from '../../../../../database/services/category';

// eslint-disable-next-line import/prefer-default-export
export async function checkAccessToProducts(req, res, next) {
  try {
    // check if parent category is part of this restaurant
    const category = await findByIdAndRestaurantId(req.params.categoryId, req.params.restaurantId);
    if (!category) {
      return res.status(statusCodes.FORBIDDEN).send({ error: res.__('FORBIDDEN') });
    }
  } catch (err) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }

  return next();
}
