import bcrypt from 'bcrypt';
import { Controllers } from '../../../../database';
import { DecodeJWT } from '../../../utils/jwt';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const { userId } = DecodeJWT(req.headers.authorization);

    const updatedEntry = {
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, Number(process.env.BCRYPT_SALT)),
    };
    await Controllers.admin.update(updatedEntry, userId);

    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    console.log(error);
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
