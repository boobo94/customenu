import { getMinimal } from '../../../../database/services/restaurant';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const restaurant = await getMinimal(req.params.restaurantId);
    if (!restaurant) {
      return res.status(statusCodes.NOT_FOUND).send({ error: res.__('RESOURCE_NOT_FOUND') });
    } if (restaurant.id !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: res.__('FORBIDDEN') });
    }

    return res.status(statusCodes.OK).send(restaurant);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
