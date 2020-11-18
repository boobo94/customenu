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
    validators.getSubcategories,
    permissions.checkAccessToParentCategory,
    getAll)

  .post('/',
    adminAuthorization,
    validators.postValidator,
    permissions.checkAccessToParentCategory,
    create)

  .put('/:subcategoryId',
    adminAuthorization,
    validators.putValidator,
    permissions.checkAccessToParentCategory,
    update)

  .get('/:subcategoryId',
    adminAuthorization,
    validators.getSubcategory,
    permissions.checkAccessToParentCategory,
    getOne)

  .delete('/:subcategoryId',
    adminAuthorization,
    validators.getSubcategory,
    permissions.checkAccessToParentCategory,
    remove);
