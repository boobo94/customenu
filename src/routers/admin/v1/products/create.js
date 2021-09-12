import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';
import { create } from '../../../../database/services/product';
import { uploadFile } from '../../../../services/object-storage';

export default async (req, res) => {
  try {
    const newEntry = {
      ...req.body,
    };

    if (req.body.file) {
      const path = `restaurant-${req.params.restaurantId}/products`;
      newEntry.image = await uploadFile(req.body.file, path);
    }

    const created = await create(newEntry);

    return res.status(statusCodes.OK).send(created);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
