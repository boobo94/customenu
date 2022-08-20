import { findOneByRestaurant } from '../../../../database/services/payment';
import statusCodes from '../../../utils/statusCodes';
import { generateInvoice } from '../../../utils/invoice';

export default async (req, res) => {
  try {
    const payment = await findOneByRestaurant(req.params.paymentId, req.params.restaurantId);
    if (!payment) {
      return res.status(statusCodes.NOT_FOUND).send({ error: res.__('RESOURCE_NOT_FOUND') });
    }

    const invoice = await generateInvoice(payment);

    return res
      .set({
        'Content-Disposition': `attachment; filename=${process.env.INVOICE_PREFIX}${payment.id}.pdf`,
        'Content-Type': 'application/pdf',
      })
      .status(statusCodes.OK)
      .send(invoice);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};
