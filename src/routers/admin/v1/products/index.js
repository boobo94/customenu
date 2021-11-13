import { Router } from 'express';
import adminAuthorization from '../../../middleware/admin-authorization';
import * as validators from './validator';
import * as permissions from './permissions';
import getAll from './get-all';
import getOne from './get';
import create from './create';
import remove from './remove';
import update from './update';
import search from './search';

export default Router({ mergeParams: true })
  .get('/',
    adminAuthorization,
    validators.getProducts,
    permissions.checkAccessToProductsOfRestaurant,
    getAll)

  .get('/search',
    adminAuthorization,
    validators.searchProducts,
    permissions.checkAccessToProductsOfRestaurant,
    search)

  .get('/:productId',
    adminAuthorization,
    validators.getProduct,
    permissions.checkAccessToProduct,
    getOne)

  .post('/',
    adminAuthorization,
    validators.postValidator,
    permissions.checkAccessToProductsOfRestaurant,
    create)

  .put('/:productId',
    adminAuthorization,
    validators.putValidator,
    permissions.checkAccessToProduct,
    update)

  .delete('/:productId',
    adminAuthorization,
    validators.getProduct,
    permissions.checkAccessToProduct,
    remove);
