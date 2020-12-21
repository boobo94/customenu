import { Controllers } from '../../../../database';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

const adapter = (element) => {
  const response = {
    id: element.id,
    shortUrl: element.shortUrl,
    currency: element.currency,
    email: element.email,
    phone: element.phone,
    address: element.address,
    instagramUrl: element.instagramUrl,
    facebookUrl: element.facebookUrl,
    youtubeUrl: element.youtubeUrl,
  };

  if (element.restaurant_i18ns) {
    response.name = element.restaurant_i18ns[0].name;
    response.description = element.restaurant_i18ns[0].description;
    response.allergens = element.restaurant_i18ns[0].allergens;
  }

  return response;
};

export default async (req, res) => {
  try {
    console.log('params', req.params);
    const restaurant = await Controllers.restaurant.findById(req.params.restaurantId, req.headers['accept-language']);
    if (!restaurant) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    } if (restaurant.id !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: errors.FORBIDDEN });
    }

    return res.status(statusCodes.OK).send(adapter(restaurant));
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
