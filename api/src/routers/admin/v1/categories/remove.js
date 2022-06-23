import { findByIdSimple, remove } from '../../../../database/services/category';
import errors from '../../../../locales/errors.json';
import { deleteFile } from '../../../../services/storage';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const entry = await findByIdSimple(req.params.categoryId);
    if (!entry) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }

    // delete image
    if (entry.image) {
      await deleteFile(entry.image);
    }
    await remove(req.params.categoryId);

    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
