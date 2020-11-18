import statusCodes from '../../../utils/statusCodes';
import errors from '../../../../locales/errors.json';
import { Controllers } from '../../../../database';

// eslint-disable-next-line import/prefer-default-export
export async function checkAccessToParentCategory(req, res, next) {
  try {
    const category = await Controllers.category.findByIdSimple(req.params.categoryId);
    if (!category) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    } if (category.restaurantId !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: errors.FORBIDDEN });
    }
  } catch (err) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }

  return next();
}
