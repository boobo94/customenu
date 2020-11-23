import { Controllers } from '../../../../database';
import errors from '../../../../locales/errors.json';
import { deleteFile } from '../../../../services/object-storage';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const entry = await Controllers.category.findByIdSimple(req.params.categoryId);
    if (!entry) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }

    // delete image
    if (entry.image) {
      await deleteFile(entry.image);
    }
    await Controllers.category.delete(req.params.categoryId);

    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
