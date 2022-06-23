import { Router } from 'express';
import adminAuthorization from '../../../../middleware/admin-authorization';
import * as validators from './validator';
import getAll from './get-all';
import getOne from './get';

export default Router({ mergeParams: true })
  .get(
    '/',
    adminAuthorization,
    validators.getPlans,
    getAll,
  )

  .get(
    '/:planId',
    adminAuthorization,
    validators.getPlan,
    getOne,
  );
