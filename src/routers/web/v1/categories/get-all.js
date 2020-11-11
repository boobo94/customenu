import { Controllers } from '../../../../database';
import errors from '../../../../locales/errors.json';
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
    const categories = await Controllers.category.findAll(req.params.restaurantId, req.headers['accept-language']);

    return res.status(statusCodes.OK).send(adapter(categories));
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
