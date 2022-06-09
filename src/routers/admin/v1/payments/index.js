import { Router } from 'express';
import adminAuthorization from '../../../middleware/admin-authorization';
import * as validators from './validator';
import getAll from './get-me';

export default Router({ mergeParams: true })
  .get(
    '/me',
    adminAuthorization,
    validators.getPayments,
    getAll,
  );
