import { Controllers } from '../../../../database';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const restaurant = await Controllers.restaurant.getLanguages(req.params.restaurantId);
    if (!restaurant) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }

    return res.status(statusCodes.OK).send(restaurant.languages);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
