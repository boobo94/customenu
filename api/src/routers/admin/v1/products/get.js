import { findByIdWithI18n } from '../../../../database/services/product';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const product = await findByIdWithI18n(req.params.productId);
    if (!product) {
      return res.status(statusCodes.NOT_FOUND).send({ error: res.__('RESOURCE_NOT_FOUND') });
    }

    return res.status(statusCodes.OK).send(product);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
