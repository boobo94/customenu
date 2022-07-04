import { Router } from 'express';
import adminAuthorization from '../../../middleware/admin-authorization';
import * as validators from './validator';
import * as permissions from './permissions';
import getAll from './get-all';
import create from './create';
import remove from './remove';
import downloadQrCode from './download-qr-code';

export default Router({ mergeParams: true })
  .get(
    '/',
    adminAuthorization,
    validators.getTables,
    permissions.checkAccessToTables,
    getAll,
  )

  .post(
    '/',
    adminAuthorization,
    validators.postValidator,
    permissions.checkAccessToTables,
    create,
  )

  .delete(
    '/:tableId',
    adminAuthorization,
    validators.getTable,
    permissions.checkAccessToModifyTable,
    remove,
  )

  .get(
    '/:tableId/download',
    adminAuthorization,
    validators.getTable,
    permissions.checkAccessToModifyTable,
    downloadQrCode,
  );
