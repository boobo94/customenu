import { findOne } from '../../../../../database/services/subscription-plan';
import statusCodes from '../../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const plan = await findOne(req.params.planId);
    if (!plan) {
      return res.status(statusCodes.NOT_FOUND).send({ error: res.__('RESOURCE_NOT_FOUND') });
    }

    return res.status(statusCodes.OK).send(plan);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
