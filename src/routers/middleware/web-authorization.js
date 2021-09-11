import statusCodes from '../utils/statusCodes';
import errors from '../../locales/errors.json';
import { findByRestaurantAndToken } from '../../database/services/restaurant';

export default async (req, res, next) => {
  try {
    const restaurant = await findByRestaurantAndToken(
      req.params.restaurant,
    );
    if (!restaurant) {
      return res.status(statusCodes.UNAUTHORIZED).send({ error: errors.UNAUTHORIZED });
    }

    // language was not set or the language set is not available for that restaurant
    if (!req.headers['accept-language'] || !restaurant.languages.includes(req.headers['accept-language'])) {
      const [defaultLanguage] = restaurant.languages;
      req.headers['accept-language'] = defaultLanguage;
    }

    req.params.restaurantId = restaurant.id; // set restaurantId on req.params
  } catch (err) {
    return res.status(statusCodes.UNAUTHORIZED).send({ error: errors.UNAUTHORIZED });
  }

  return next();
};
