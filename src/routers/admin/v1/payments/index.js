import { Router } from 'express';
import adminAuthorization from '../../../middleware/admin-authorization';
import * as validators from './validator';
import getAll from './get-all';

export default Router({ mergeParams: true })
  .get(
    '/',
    adminAuthorization,
    validators.getPayments,
    getAll,
  );
