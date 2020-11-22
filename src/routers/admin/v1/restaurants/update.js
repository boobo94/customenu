import { Controllers } from '../../../../database';
import { transaction } from '../../../../database/utils/transaction';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  const t = await transaction();

  try {
    const entry = await Controllers.restaurant.getMinimal(req.params.restaurantId);
    if (!entry) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }

    if (req.body.file) {
      // todo: upload file
      // req.body.image = URL
    }

    await Controllers.restaurant.update(req.body, req.params.restaurantId, t);
    t.commit();

    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    await t.rollback();
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
