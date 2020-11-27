import * as qrcode from 'qrcode';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';
import { Controllers } from '../../../../database';
import { uploadFile } from '../../../../services/object-storage';
import { transaction } from '../../../../database/utils/transaction';

export default async (req, res) => {
  const t = await transaction();

  try {
    const newEntry = {
      ...req.body,
    };

    const created = await Controllers.restaurant.create(newEntry);

    const path = `restaurant-${created.id}`;
    if (req.body.file) {
      created.logo = await uploadFile(req.body.file, path);
    }

    const qrCodeFile = await qrcode.toDataURL(`${process.env.APP_URL}${created.shortUrl}`, {
      errorCorrectionLevel: 'H',
      width: 300,
    });
    created.qr_code = await uploadFile(qrCodeFile, path);
    await Controllers.restaurant.update(created, created.id, t);

    t.commit();

    return res.status(statusCodes.OK).send(created);
  } catch (error) {
    await t.rollback();
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
