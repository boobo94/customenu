import statusCodes from '../../../utils/statusCodes';
import { DecodeJWT } from '../../../utils/jwt';

// eslint-disable-next-line import/prefer-default-export
export async function checkAccessToUpdateProfile(req, res, next) {
  const DEMO_ACCOUNT_ID = 2;
  try {
    const { userId } = DecodeJWT(req.headers.authorization);
    if (userId === DEMO_ACCOUNT_ID) {
      return res.status(statusCodes.FORBIDDEN).send({ error: res.__('FORBIDDEN') });
    }
  } catch (err) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }

  return next();
}
