import { findByIdWithI18n } from '../../../../database/services/restaurant';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const restaurant = await findByIdWithI18n(req.params.restaurantId);
    if (!restaurant) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }

    return res.status(statusCodes.OK).send(restaurant);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
