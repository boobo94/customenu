import { findOne } from '../../../../../database/services/subscription-plan';
import errors from '../../../../../locales/errors.json';
import statusCodes from '../../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const plan = await findOne(req.params.planId);
    if (!plan) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    } if (plan.restaurantId !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: errors.FORBIDDEN });
    }

    return res.status(statusCodes.OK).send(plan);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
