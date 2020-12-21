import statusCodes from '../utils/statusCodes';
import errors from '../../locales/errors.json';
import { Controllers } from '../../database';

export default async (req, res, next) => {
  try {
    const restaurant = await Controllers.restaurant.findByRestaurantAndToken(
      req.params.restaurant,
    );
    if (!restaurant) {
      return res.status(statusCodes.UNAUTHORIZED).send({ error: errors.UNAUTHORIZED });
    }

    if (!req.headers['accept-language']) {
      const [defaultLanguage] = restaurant.languages;
      req.headers['accept-language'] = defaultLanguage;
    }

    req.params.restaurantId = restaurant.id; // set restaurantId on req.params
  } catch (err) {
    return res.status(statusCodes.UNAUTHORIZED).send({ error: errors.UNAUTHORIZED });
  }

  console.log('params middleware', req.params);

  return next();
};
