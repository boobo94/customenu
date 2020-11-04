import { Controllers } from '../../../../database';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const category = await Controllers.category.findById(req.params.categoryId, req.headers['accept-language']);
    if (category.restaurantId !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: errors.FORBIDDEN });
    }

    const subcategories = await Controllers.subcategory.findAll(req.params.categoryId, req.headers['accept-language']);

    return res.status(statusCodes.OK).send(subcategories);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
