import statusCodes from '../../../utils/statusCodes';
import errors from '../../../../locales/errors.json';
import { DecodeJWT } from '../../../utils/jwt';
import { Controllers } from '../../../../database';

// eslint-disable-next-line import/prefer-default-export
export async function checkAccessToParentCategory(req, res, next) {
  try {
    const { restaurantId } = DecodeJWT(req.headers.authorization);
    const subcategory = await Controllers.subcategory.findByIdAndCategorySimple(
      req.params.subcategoryId, req.params.categoryId,
    );
    if (!subcategory) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    } if (restaurantId !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: errors.FORBIDDEN });
    }
  } catch (err) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }

  return next();
}
