import { findAll } from '../../../../database/services/category';
import statusCodes from '../../../utils/statusCodes';

const adapter = (categories) => categories.map((element) => {
  const response = {
    id: element.id,
    restaurantId: element.restaurantId,
    image: element.image,
  };

  if (element.category_i18ns) {
    response.name = element.category_i18ns[0].name;
  }

  return response;
});

export default async (req, res) => {
  try {
    const categories = await findAll(req.params.restaurantId, req.headers['accept-language']);

    return res.status(statusCodes.OK).send(adapter(categories));
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
