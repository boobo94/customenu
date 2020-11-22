import { Controllers } from '../../../../database';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const newCategory = {
      ...req.body,
      restaurantId: req.params.restaurantId,
    };

    if (req.body.file) {
      // todo: upload file
      // newCategory.image = URL
    }
    const created = await Controllers.category.create(newCategory);

    return res.status(statusCodes.OK).send(created);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
