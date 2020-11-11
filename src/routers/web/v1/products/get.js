import { Controllers } from '../../../../database';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

const adapter = (element) => {
  const response = {
    id: element.id,
    restaurantId: element.restaurantId,
    image: element.image,
    weight: element.weight,
    price: element.price,
  };

  if (element.product_i18ns) {
    response.name = element.product_i18ns[0].name;
    response.description = element.product_i18ns[0].description;
  }

  return response;
};

export default async (req, res) => {
  try {
    const subcategory = await Controllers.subcategory.findByIdWithCategoryAndRestaurant(req.params.subcategoryId, req.params.categoryId, req.headers['accept-language']);
    if (!(subcategory && subcategory.category
      && subcategory.category.restaurantId === req.params.restaurantId)) {
      return res.status(statusCodes.FORBIDDEN).send({ error: errors.FORBIDDEN });
    }

    const product = await Controllers.product.findById(req.params.productId, req.headers['accept-language']);
    if (!product) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }

    return res.status(statusCodes.OK).send(adapter(product));
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
