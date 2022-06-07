import { findAll } from '../../../../database/services/payment';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const plans = await findAll(req.params.restaurantId);
    return res.status(statusCodes.OK).send(plans);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
