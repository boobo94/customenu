import { findAll } from '../../../../database/services/table';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const tables = await findAll(req.params.restaurantId);

    return res.status(statusCodes.OK).send(tables);
  } catch (e) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
