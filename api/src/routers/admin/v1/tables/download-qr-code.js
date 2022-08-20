import * as qrcode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import { getMinimal } from '../../../../database/services/restaurant';
import { findOne } from '../../../../database/services/table';
import statusCodes from '../../../utils/statusCodes';

async function generateQR(restaurantUrl, tableName) {
  const qrCodeCanvas = createCanvas(1, 1);
  const ctx = qrCodeCanvas.getContext('2d');

  // add the qr code to canvas
  await qrcode.toCanvas(qrCodeCanvas, `${process.env.APP_URL}${restaurantUrl}?table=${tableName}`, {
    errorCorrectionLevel: 'H',
    width: 300,
  });

  const logo = await loadImage('./public/images/logo.png');
  const logoSize = 128;
  const xCenter = (qrCodeCanvas.width - logoSize) / 2;
  const yCenter = (qrCodeCanvas.height - logoSize) / 2;

  ctx.drawImage(logo, xCenter, yCenter, logoSize, logoSize);

  return qrCodeCanvas.toBuffer();
}

export default async (req, res) => {
  try {
    const restaurant = await getMinimal(req.params.restaurantId);
    const table = await findOne(req.params.tableId);
    if (!table) {
      return res.status(statusCodes.NOT_FOUND).send({ error: res.__('RESOURCE_NOT_FOUND') });
    }

    const qrCodeFile = await generateQR(restaurant.shortUrl, table.name);

    return res
      .set({
        'Content-Type': 'image/png',
      })
      .status(statusCodes.OK)
      .send(qrCodeFile);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
