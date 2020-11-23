import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';
import { Controllers } from '../../../../database';
import { deleteFile } from '../../../../services/object-storage';

export default async (req, res) => {
  try {
    const entry = await Controllers.subcategory.findByIdAndCategorySimple(
      req.params.subcategoryId, req.params.categoryId,
    );
    if (!entry) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }

    if (entry.image) {
      await deleteFile(entry.image);
    }

    await Controllers.subcategory.delete(req.params.subcategoryId);

    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
