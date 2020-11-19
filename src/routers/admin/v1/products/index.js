import { Router } from 'express';
import adminAuthorization from '../../../middleware/admin-authorization';
import * as validators from './validator';
import * as permissions from './permissions';
import getAll from './get-all';
import getOne from './get';
import create from './create';
import remove from './remove';
import update from './update';

export default Router({ mergeParams: true })
  .get('/',
    adminAuthorization,
    validators.getProducts,
    permissions.checkAccessToProductsOfRestaurant,
    getAll)

  .get('/:productId',
    adminAuthorization,
    validators.getProduct,
    permissions.checkAccessToProductsOfRestaurant,
    getOne)

  .post('/',
    adminAuthorization,
    validators.postValidator,
    permissions.checkAccessToProductsOfRestaurant,
    create)

  .put('/:productId',
    adminAuthorization,
    validators.putValidator,
    permissions.checkAccessToProductsOfRestaurant,
    update)

  .delete('/:productId',
    adminAuthorization,
    validators.getProduct,
    permissions.checkAccessToProductsOfRestaurant,
    remove);
