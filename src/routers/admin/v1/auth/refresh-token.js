import { v4 as uuid } from 'uuid';
import StatusCodes from '../../../utils/statusCodes';
import errors from '../../../../locales/errors.json';
import { findOneByRefreshToken, update } from '../../../../database/services/admin';
import { GenerateJWT } from '../../../utils/jwt';

export default async (req, res) => {
  try {
    const admin = await findOneByRefreshToken(req.body.refreshToken);
    if (!admin) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: errors.UNAUTHORIZED });
    }

    const newRefreshToken = uuid();
    await update({
      refreshToken: newRefreshToken,
    }, admin.id);

    return res.status(StatusCodes.OK).send({
      token: GenerateJWT(admin.id),
      refreshToken: newRefreshToken,
      restaurantId: admin.restaurantId,
    });
  } catch (error) {
    return res.status(StatusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
