import bcrypt from 'bcrypt';
import { update } from '../../../../database/services/admin';
import { DecodeJWT } from '../../../utils/jwt';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const { userId } = DecodeJWT(req.headers.authorization);

    const updatedEntry = {
      email: req.body.email,
    };
    if (req.body.password) {
      updatedEntry.password = await bcrypt.hash(req.body.password, Number(process.env.BCRYPT_SALT));
    }

    await update(updatedEntry, userId);

    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
