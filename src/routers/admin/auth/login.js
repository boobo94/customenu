import bcrypt from 'bcrypt';
import StatusCodes from '../../utils/statusCodes';
import errors from '../../../locales/errors.json';
import { Controllers } from '../../../database';
import { GenerateJWT } from '../../utils/jwt';

export default async (req, res) => {
  try {
    const admin = await Controllers.admin.findByEmail(req.body.email);
    if (!admin) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: errors.UNAUTHORIZED });
    }

    // check if the password is correct
    const isCorrect = await bcrypt.compare(req.body.password, admin.password);
    if (!isCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: errors.UNAUTHORIZED });
    }

    return res.status(StatusCodes.OK).send({
      token: GenerateJWT(admin.id),
      refreshToken: admin.refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
