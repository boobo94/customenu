import statusCodes from '../utils/statusCodes';
import { findByRestaurantAndToken } from '../../database/services/restaurant';
import { findActiveByRestaurant } from '../../database/services/subscription';

export default async (req, res, next) => {
  try {
    // get restaurant by url name
    const restaurant = await findByRestaurantAndToken(
      req.params.restaurant,
    );
    if (!restaurant) {
      return res.status(statusCodes.UNAUTHORIZED).send({ error: res.__('UNAUTHORIZED') });
    }

    // check if the restaurant has an active subscription
    const subscription = await findActiveByRestaurant(restaurant.id);
    if (!subscription) {
      return res.status(statusCodes.UNAUTHORIZED).send({ error: res.__('UNAUTHORIZED') });
    }

    // language was not set or the language set is not available for that restaurant
    if (!req.headers['accept-language'] || !restaurant.languages.includes(req.headers['accept-language'])) {
      const [defaultLanguage] = restaurant.languages;
      req.headers['accept-language'] = defaultLanguage;
    }

    req.params.restaurantId = restaurant.id; // set restaurantId on req.params
  } catch (err) {
    return res.status(statusCodes.UNAUTHORIZED).send({ error: res.__('UNAUTHORIZED') });
  }

  return next();
};
