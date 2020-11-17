import { Router } from 'express';
// import subcategoriesRouter from '../subcategories';
import adminAuthorization from '../../../middleware/admin-authorization';
import getAll from './get-all';
import getOne from './get';
import * as validators from './validator';
import * as permissions from './permissions';

export default Router({ mergeParams: true })
  .get('/',
    adminAuthorization,
    validators.getCategories,
    permissions.getCategories,
    getAll)

  .get('/:categoryId',
    adminAuthorization,
    validators.getCategory,
    getOne);

// .use('/:categoryId/subcategories', webAuthorization, subcategoriesRouter);
