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
    '/:subscriptionId',
    adminAuthorization,
    validators.getSubscription,
    permissions.checkAccessToSubscriptions,
    getOne,
  )

  .delete(
    '/:subscriptionId',
    adminAuthorization,
    validators.getSubscription,
    permissions.checkAccessToDeleteSubscription,
    remove,
  );
