import { v4 as uuid } from 'uuid';
import StatusCodes from '../../../utils/statusCodes';
import { findOneByRefreshToken, update } from '../../../../database/services/admin';
import { GenerateJWT } from '../../../utils/jwt';

export default async (req, res) => {
  try {
    const admin = await findOneByRefreshToken(req.body.refreshToken);
    if (!admin) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: res.__('UNAUTHORIZED') });
    }

    const newRefreshToken = uuid();
    await update({
      refreshToken: newRefreshToken,
    }, admin.id);

    return res.status(StatusCodes.OK).send({
      token: GenerateJWT(admin.id, admin.restaurantId),
      refreshToken: newRefreshToken,
      restaurantId: admin.restaurantId,
    });
  } catch (error) {
    return res.status(StatusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
