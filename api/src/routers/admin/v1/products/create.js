import statusCodes from '../../../utils/statusCodes';
import { create } from '../../../../database/services/product';
import { uploadFile } from '../../../../services/storage';

export default async (req, res) => {
  try {
    const newEntry = {
      ...req.body,
      restaurantId: req.params.restaurantId,
    };

    if (req.body.file) {
      const path = `restaurant-${req.params.restaurantId}/products`;
      newEntry.image = await uploadFile(req.body.file, path);
    }

    const created = await create(newEntry);

    return res.status(statusCodes.OK).send(created);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
