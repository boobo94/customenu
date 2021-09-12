import { findAllOfRestaurants } from '../../../../database/services/product';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

const adapter = (categories) => categories.map((element) => {
  const response = {
    id: element.id,
    categoryId: element.categoryId,
    image: element.image,
    weight: element.weight,
    price: element.price,
    cookingTime: element.cookingTime,
  };

  if (element.product_i18ns) {
    response.name = element.product_i18ns[0].name;
    response.description = element.product_i18ns[0].description;
    response.allergens = element.product_i18ns[0].allergens;
  }

  return response;
});

export default async (req, res) => {
  try {
    const products = await findAllOfRestaurants(req.params.restaurantId, req.headers['accept-language']);

    return res.status(statusCodes.OK).send(adapter(products));
  } catch (error) {
    console.log(error);
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
