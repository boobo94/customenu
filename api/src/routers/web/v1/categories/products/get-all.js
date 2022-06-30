import { findById as findCategoryById } from '../../../../../database/services/category';
import { findAll } from '../../../../../database/services/product';
import errors from '../../../../../locales/errors.json';
import statusCodes from '../../../../utils/statusCodes';

const adapter = (products) => products.map((element) => {
  const response = {
    id: element.id,
    restaurantId: element.restaurantId,
    image: element.image,
    weight: element.weight,
    price: element.price,
    categoryId: element.categoryId,
    cookingTime: element.cookingTime,
  };

  if (element.product_i18ns) {
    response.name = element.product_i18ns[0].name;
    response.description = element.product_i18ns[0].description;
    response.allergens = element.product_i18ns[0].allergens;
  }

  return response;
});

const adapterCategory = (element) => ({
  id: element.id,
  restaurantId: element.restaurantId,
  image: element.image,
  name: element.category_i18ns[0].name,
});

export default async (req, res) => {
  try {
    const products = await findAll(req.params.categoryId, req.headers['accept-language']);
    const category = await findCategoryById(req.params.categoryId, req.headers['accept-language']);

    return res.status(statusCodes.OK).send({
      category: adapterCategory(category),
      products: adapter(products),
    });
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
