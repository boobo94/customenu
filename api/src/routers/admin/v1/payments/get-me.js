import { findAll } from '../../../../database/services/payment';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const payments = await findAll(req.params.restaurantId);
    return res.status(statusCodes.OK).send(payments);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
