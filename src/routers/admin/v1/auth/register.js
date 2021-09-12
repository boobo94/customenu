import bcrypt from 'bcrypt';
import * as qrcode from 'qrcode';
import StatusCodes from '../../../utils/statusCodes';
import errors from '../../../../locales/errors.json';
import { findByEmail, create as createAdmin } from '../../../../database/services/admin';
import { create as createRestaurant, update as updateRestaurant } from '../../../../database/services/restaurant';
import { uploadFile } from '../../../../services/object-storage';
import { transaction } from '../../../../database/utils/transaction';

export default async (req, res) => {
  const t = await transaction();

  try {
    const admin = await findByEmail(req.body.admin.email);
    if (admin) {
      return res.status(StatusCodes.CONFLICT).send({ error: errors.EMAIL_ALREADY_USED });
    }

    // create restaurant
    const restaurantCreated = await createRestaurant(req.body.restaurant, t);

    // attach admin
    await createAdmin({
      email: req.body.admin.email,
      password: await bcrypt.hash(req.body.admin.password, Number(process.env.BCRYPT_SALT)),
      restaurantId: restaurantCreated.id,
      isActive: true,
    }, t);

    // upload logo
    const path = `restaurant-${restaurantCreated.id}`;
    if (req.body.restaurant.file) {
      restaurantCreated.logo = await uploadFile(req.body.restaurant.file, path);
    }

    // upload qr code
    const qrCodeFile = await qrcode.toDataURL(`${process.env.APP_URL}${restaurantCreated.shortUrl}`, {
      errorCorrectionLevel: 'H',
      width: 300,
    });
    const qrCodeUrl = await uploadFile(qrCodeFile, path);
    restaurantCreated.qr_code = qrCodeUrl;

    // update restaurant
    await updateRestaurant({
      qr_code: qrCodeUrl,
      logo: restaurantCreated.logo,
    }, restaurantCreated.id, t);

    t.commit();

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    await t.rollback();
    // eslint-disable-next-line consistent-return
    error.errors.forEach((e) => {
      if (e.type === 'unique violation' && e.path === 'shortUrl') {
        return res.status(StatusCodes.CONFLICT).send({ error: errors.ERROR_SHORT_URL_UNIQUE });
      }
    });

    return res.status(StatusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
