import { findByIdWithI18n } from '../../../../database/services/category';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const subscription = await findByIdWithI18n(req.params.categoryId);
    if (!subscription) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    } if (subscription.restaurantId !== req.params.restaurantId) {
      return res.status(statusCodes.FORBIDDEN).send({ error: errors.FORBIDDEN });
    }

    return res.status(statusCodes.OK).send(subscription);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
