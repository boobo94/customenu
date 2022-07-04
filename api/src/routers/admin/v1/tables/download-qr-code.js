import * as qrcode from 'qrcode';
import { getMinimal } from '../../../../database/services/restaurant';
import { findOne } from '../../../../database/services/table';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const restaurant = await getMinimal(req.params.restaurantId);
    const table = await findOne(req.params.tableId);
    if (!table) {
      return res.status(statusCodes.NOT_FOUND).send({ error: errors.RESOURCE_NOT_FOUND });
    }

    const qrCodeFile = await qrcode.toBuffer(`${process.env.APP_URL}${restaurant.shortUrl}?table=${table.name}`, {
      errorCorrectionLevel: 'H',
      width: 300,
    });

    return res
      .set({
        'Content-Type': 'image/png',
      })
      .status(statusCodes.OK)
      .send(qrCodeFile);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};
