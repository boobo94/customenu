import { findAll } from '../../../../../database/services/subscription-plan';
import statusCodes from '../../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const plans = await findAll();
    return res.status(statusCodes.OK).send(plans);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
