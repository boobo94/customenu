import pdf from 'pdfjs';
import Helvetica from 'pdfjs/font/Helvetica';
import HelveticaBold from 'pdfjs/font/Helvetica-Bold';
import { readFileSync } from 'fs';
import { DateTime } from 'luxon';

const billingVendor = {
  name: 'Cmevo Digital S.R.L.',
  taxId: '43006856',
  vatTaxId: 'RO43449837',
  address: 'Bucuresti, Sector 3, str. Drumul Gura Caliței, Nr. 4-32, Bl. 7, Sc. A, Et. 1, Ap. 20, Cod postal: 032604',
  bank: 'ING Bank',
  IBAN: 'RO80INGB0000999910620195',
  invoicePrefix: 'CUSTOMENU-',
  invoiceVatPrefix: 'CUSTOMENUI-',
};

// eslint-disable-next-line import/prefer-default-export
export function generateInvoice(payment) {
  const invoicePrefix = payment.vatAmount
    ? billingVendor.invoiceVatPrefix
    : billingVendor.invoicePrefix;

  const doc = new pdf.Document({
    font: Helvetica,
    title: `${invoicePrefix}${payment.invoiceNumber}`,
  });

  const header = doc.header().table({ widths: [null, null], paddingBottom: 1 * pdf.cm }).row();
  const logo = new pdf.Image(readFileSync(`${__dirname}/../../../public/images/cmevo-logo-black.jpg`));
  header.cell().image(logo, { height: 2 * pdf.cm });
  header.cell({ textAlign: 'right' })
    .text(`Invoice ${invoicePrefix}${payment.invoiceNumber}`, { font: HelveticaBold, fontSize: 14 })
    .text('Issued ').add(DateTime.fromJSDate(payment.createdAt).toFormat('dd/MM/yyyy'))
    .text('Due ')
    .add(DateTime.fromJSDate(payment.createdAt).plus({ month: 1 }).toFormat('dd/MM/yyyy'))
    .text('https://cmevo.com', {
      link: 'https://cmevo.com',
      underline: true,
      color: 0x569cd6,
    });

  doc.footer()
    .pageNumber((curr, total) => `${curr} / ${total}`, { textAlign: 'center' });

  doc.cell();

  const tableCompanyDetails = doc.table({
    widths: [null, null],
  });

  const rowTableCompanyDetails = tableCompanyDetails.row();
  rowTableCompanyDetails.cell()
    .text('Furnizor')
    .text('  ')
    .text(billingVendor.name)
    .text(billingVendor.taxId)
    .text(billingVendor.vatTaxId)
    .text(billingVendor.address)
    .text(billingVendor.bank)
    .text(billingVendor.IBAN);

  rowTableCompanyDetails.cell()
    .text('Client')
    .text('  ')
    .text(payment.restaurant.billingCompanyName)
    .text(payment.restaurant.billingTaxId)
    .text(payment.restaurant.billingAddress);

  doc.cell('  ');
  doc.cell('  ');

  const tableProducts = doc.table({
    widths: payment.vatAmount
      // if has vatAmount display the vat column
      ? [1.5 * pdf.cm, null, 2.5 * pdf.cm, 2.5 * pdf.cm, 2.5 * pdf.cm]
      : [1.5 * pdf.cm, null, 2.5 * pdf.cm, 2.5 * pdf.cm],
    borderHorizontalWidth: 1,
    padding: 5,
  });

  const tr = tableProducts.header({ font: HelveticaBold, borderBottomWidth: 1.5 });
  tr.cell('#');
  tr.cell('Description');
  tr.cell('Price', { textAlign: 'right' });
  if (payment.vatAmount) {
    tr.cell('VAT', { textAlign: 'right' });
  }
  tr.cell('Total', { textAlign: 'right' });

  const priceWithoutVat = Number(payment.amount - payment.vatAmount).toFixed(2);

  const rowTableProducts = tableProducts.row();
  rowTableProducts.cell('1');
  rowTableProducts.cell(payment.subscription.subscriptionPlan.name);
  rowTableProducts.cell().text(`${priceWithoutVat} ${payment.subscription.subscriptionPlan.currency}`, { textAlign: 'right' });
  if (payment.vatAmount) {
    rowTableProducts.cell().text(`${payment.vatAmount} ${payment.subscription.subscriptionPlan.currency}`, { textAlign: 'right' });
  }
  rowTableProducts.cell().text(`${payment.amount} ${payment.subscription.subscriptionPlan.currency}`, { textAlign: 'right' });

  const rowFinalTableProducts = tableProducts.row();
  rowFinalTableProducts.cell();
  rowFinalTableProducts.cell();
  rowFinalTableProducts.cell().text(`${priceWithoutVat} ${payment.subscription.subscriptionPlan.currency}`, { textAlign: 'right', font: HelveticaBold });
  if (payment.vatAmount) {
    rowFinalTableProducts.cell().text(`${payment.vatAmount} ${payment.subscription.subscriptionPlan.currency}`, { textAlign: 'right', font: HelveticaBold });
  }
  rowFinalTableProducts.cell().text(`${payment.amount} ${payment.subscription.subscriptionPlan.currency}`, { textAlign: 'right', font: HelveticaBold });

  return doc.asBuffer();
}
