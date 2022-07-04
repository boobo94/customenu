import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';
import { create } from '../../../../database/services/table';

export default async (req, res) => {
  try {
    const created = await create({
      name: req.body.name,
      restaurantId: req.params.restaurantId,
    });

    return res.status(statusCodes.OK).send(created);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
