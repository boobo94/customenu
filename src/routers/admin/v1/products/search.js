import { searchProducts } from '../../../../database/services/product';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';
import { adaptAll } from './adapters';

export default async (req, res) => {
  try {
    const products = await searchProducts(req.params.restaurantId, req.query.keyword, req.headers['accept-language']);
    return res.status(statusCodes.OK).send(adaptAll(products));
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
