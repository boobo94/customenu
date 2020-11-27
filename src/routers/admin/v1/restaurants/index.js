import { Router } from 'express';
import adminAuthorization from '../../../middleware/admin-authorization';
import rootAdminAuthorization from '../../../middleware/root-admin-authorization';
import * as validators from './validator';
import * as permissions from './permissions';
import getOne from './get';
import getLanguages from './get-languages';
import update from './update';
import create from './create';

export default Router({ mergeParams: true })

  .post('/',
    rootAdminAuthorization,
    validators.create,
    create)

  .get('/:restaurantId',
    adminAuthorization,
    validators.getRestaurant,
    permissions.checkAccessToRestaurant,
    getOne)

  .get('/:restaurantId/languages',
    adminAuthorization,
    validators.getRestaurant,
    permissions.checkAccessToRestaurant,
    getLanguages)

  .put('/:restaurantId',
    adminAuthorization,
    validators.putValidator,
    permissions.checkAccessToRestaurant,
    update);
