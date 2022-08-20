import { findAllOfRestaurants } from '../../../../database/services/product';
import statusCodes from '../../../utils/statusCodes';
import { adaptAll } from './adapters';

export default async (req, res) => {
  try {
    const products = await findAllOfRestaurants(req.params.restaurantId, req.headers['accept-language']);

    return res.status(statusCodes.OK).send(adaptAll(products));
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
