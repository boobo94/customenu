import bcrypt from 'bcrypt';
import * as qrcode from 'qrcode';
import StatusCodes from '../../../utils/statusCodes';
import errors from '../../../../locales/errors.json';
import { Controllers } from '../../../../database';
import { uploadFile } from '../../../../services/object-storage';
import { transaction } from '../../../../database/utils/transaction';

export default async (req, res) => {
  const t = await transaction();

  try {
    const admin = await Controllers.admin.findByEmail(req.body.admin.email);
    if (admin) {
      return res.status(StatusCodes.CONFLICT).send({ error: errors.EMAIL_ALREADY_USED });
    }

    // create restaurant
    const restaurantCreated = await Controllers.restaurant.create(req.body.restaurant, t);

    // attach admin
    await Controllers.admin.create({
      email: req.body.admin.email,
      password: await bcrypt.hash(req.body.admin.password, Number(process.env.BCRYPT_SALT)),
      restaurantId: restaurantCreated.id,
      isActive: true,
    }, t);

    // upload logo
    const path = `restaurant-${restaurantCreated.id}`;
    if (req.body.file) {
      restaurantCreated.logo = await uploadFile(req.body.file, path);
    }

    // upload qr code
    const qrCodeFile = await qrcode.toDataURL(`${process.env.APP_URL}${restaurantCreated.shortUrl}`, {
      errorCorrectionLevel: 'H',
      width: 300,
    });
    const qrCodeUrl = await uploadFile(qrCodeFile, path);
    restaurantCreated.qr_code = qrCodeUrl;

    // update restaurant
    await Controllers.restaurant.update({
      qr_code: qrCodeUrl,
      logo: restaurantCreated.logo,
    }, restaurantCreated.id, t);

    t.commit();

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    await t.rollback();
    return res.status(StatusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
