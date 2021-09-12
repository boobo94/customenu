import { findOne } from '../../../../database/services/admin';
import { DecodeJWT } from '../../../utils/jwt';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const { userId } = DecodeJWT(req.headers.authorization);

    const admin = await findOne(userId);
    if (!admin) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }

    return res.status(statusCodes.OK).send(admin);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
