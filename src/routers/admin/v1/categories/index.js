import { Router } from 'express';
import subcategoriesRouter from '../subcategories';
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
    validators.getCategories,
    permissions.checkAccessToCategories,
    getAll)

  .post('/',
    adminAuthorization,
    validators.postValidator,
    permissions.checkAccessToCategories,
    create)

  .put('/:categoryId',
    adminAuthorization,
    validators.putValidator,
    permissions.checkAccessToCategories,
    update)

  .get('/:categoryId',
    adminAuthorization,
    validators.getCategory,
    permissions.checkAccessToCategories,
    getOne)

  .delete('/:categoryId',
    adminAuthorization,
    validators.getCategory,
    permissions.checkAccessToDeleteCategory,
    remove)

  .use('/:categoryId/subcategories', subcategoriesRouter);
