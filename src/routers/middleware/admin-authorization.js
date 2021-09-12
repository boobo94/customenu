import statusCodes from '../utils/statusCodes';
import errors from '../../locales/errors.json';
import { findOne } from '../../database/services/admin';
import { DecodeJWT } from '../utils/jwt';

export default async (req, res, next) => {
  try {
    // check if user exists
    const { userId } = DecodeJWT(req.headers.authorization);
    const user = await findOne(userId);

    if (!user) {
      return res.status(statusCodes.UNAUTHORIZED).send({ error: errors.UNAUTHORIZED });
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(statusCodes.UNAUTHORIZED).send({ error: errors.JWT_EXPIRED });
    }

    return res.status(statusCodes.UNAUTHORIZED).send({ error: errors.UNAUTHORIZED });
  }

  return next();
};
