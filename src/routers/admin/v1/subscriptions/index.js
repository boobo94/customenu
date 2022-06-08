import { Router } from 'express';
import adminAuthorization from '../../../middleware/admin-authorization';
import * as validators from './validator';
import * as permissions from './permissions';
import getOne from './get';
import create from './create';
import remove from './remove';
import plansRouter from './plans';

export default Router({ mergeParams: true })

  .use(
    '/plans',
    plansRouter,
  )

  .post(
    '/',
    adminAuthorization,
    validators.postValidator,
    permissions.checkAccessToSubscriptions,
    create,
  )

  .get(
    '/me',
    adminAuthorization,
    validators.getMySubscription,
    permissions.checkAccessToSubscriptions,
    getOne,
  )

  .delete(
    '/:subscriptionId',
    adminAuthorization,
    validators.deleteSubscription,
    permissions.checkAccessToDeleteSubscription,
    remove,
  );
