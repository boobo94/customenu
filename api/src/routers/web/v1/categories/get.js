import { findById } from '../../../../database/services/category';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const category = await findById(req.params.categoryId, req.headers['accept-language']);
    if (!category) {
      return res.status(statusCodes.NOT_FOUND).send({ error: res.__('RESOURCE_NOT_FOUND') });
    } if (category.restaurantId !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: res.__('FORBIDDEN') });
    }

    return res.status(statusCodes.OK).send(category);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
