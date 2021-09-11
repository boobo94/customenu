import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';
import { findOneOfRestaurantsByIdSimple, remove } from '../../../../database/services/product';
import { deleteFile } from '../../../../services/object-storage';

export default async (req, res) => {
  try {
    const entry = await findOneOfRestaurantsByIdSimple(
      req.params.productId, req.params.restaurantId,
    );
    if (!entry) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }

    // delete image
    if (entry.image) {
      await deleteFile(entry.image);
    }

    await remove(req.params.productId);

    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
