import { Router } from 'express';
import adminAuthorization from '../../../middleware/admin-authorization';
import * as validators from './validator';
import * as permissions from './permissions';
import getOne from './get';
import getLanguages from './get-languages';

export default Router({ mergeParams: true })
// .get('/',
//   adminAuthorization,
//   validators.getSubcategories,
//   permissions.checkAccessToParentCategory,
//   getAll)

  .get('/:restaurantId',
    adminAuthorization,
    validators.getRestaurant,
    permissions.checkAccessToRestaurant,
    getOne)

  .get('/:restaurantId/languages',
    adminAuthorization,
    validators.getRestaurant,
    permissions.checkAccessToRestaurant,
    getLanguages);

// .post('/',
//   adminAuthorization,
//   validators.postValidator,
//   permissions.checkAccessToParentCategory,
//   create)

// .put('/:restaurantId',
//   adminAuthorization,
//   validators.putValidator,
//   permissions.checkAccessToParentCategory,
//   update)

// .delete('/:restaurantId',
//   adminAuthorization,
//   validators.getSubcategory,
//   permissions.checkAccessToParentCategory,
//   remove);
