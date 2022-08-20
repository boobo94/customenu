import statusCodes from '../../../utils/statusCodes';
import { create } from '../../../../database/services/category';
import { uploadFile } from '../../../../services/storage';

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

    const created = await create(newCategory);

    return res.status(statusCodes.OK).send(created);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
