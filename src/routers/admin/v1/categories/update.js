import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';
import * as storageService from '../../../../services/object-storage';
import { findByIdSimple, update } from '../../../../database/services/category';
import { transaction } from '../../../../database/utils/transaction';

export default async (req, res) => {
  const t = await transaction();

  try {
    const category = await findByIdSimple(req.params.categoryId);
    if (!category) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    } if (category.restaurantId !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: errors.FORBIDDEN });
    }

    if (req.body.file) {
      await storageService.deleteFile(category.image);
      const path = `restaurant-${req.params.restaurantId}/categories`;
      req.body.image = await storageService.uploadFile(req.body.file, path);
    }

    await update(req.body, req.params.categoryId, t);
    t.commit();

    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    await t.rollback();
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
