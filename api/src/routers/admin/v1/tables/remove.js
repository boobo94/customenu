import { remove } from '../../../../database/services/table';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    await remove(req.params.tableId);

    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
