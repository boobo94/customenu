import { Router } from 'express';
import adminAuthorization from '../../../middleware/admin-authorization';
import * as validators from './validator';
import getAll from './get-me';
import downloadInvoice from './download-invoice';

export default Router({ mergeParams: true })
  .get(
    '/me',
    adminAuthorization,
    validators.getPayments,
    getAll,
  )

  .get(
    '/:paymentId/export-invoice',
    adminAuthorization,
    validators.exportInvoice,
    downloadInvoice,
  );
