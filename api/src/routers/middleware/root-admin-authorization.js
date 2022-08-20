import statusCodes from '../utils/statusCodes';
import { findOne } from '../../database/services/admin';
import { DecodeJWT } from '../utils/jwt';

export default async (req, res, next) => {
  try {
    // check if user exists
    const { userId } = DecodeJWT(req.headers.authorization);
    const user = await findOne(userId);
    if (!user || user.type !== 'root') {
      return res.status(statusCodes.UNAUTHORIZED).send({ error: res.__('UNAUTHORIZED') });
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(statusCodes.UNAUTHORIZED).send({ error: res.__('JWT_EXPIRED') });
    }

    return res.status(statusCodes.UNAUTHORIZED).send({ error: res.__('UNAUTHORIZED') });
  }

  return next();
};
