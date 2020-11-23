import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';
import { Controllers } from '../../../../database';
import { uploadFile } from '../../../../services/object-storage';

export default async (req, res) => {
  try {
    const newCategory = {
      ...req.body,
      restaurantId: req.params.restaurantId,
    };

    if (req.body.file) {
      const path = `restaurant-${req.params.restaurantId}/categories`;
      newCategory.image = await uploadFile(req.body.file, path);
    }

    const created = await Controllers.category.create(newCategory);

    return res.status(statusCodes.OK).send(created);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
