import { Router } from 'express';
import webAuthorization from '../../../../middleware/web-authorization';
import getAll from './get-all';
import getOne from './get';
import * as validators from './validator';
import { checkAccessToProducts } from './permissions';
import search from './search';

export default Router({ mergeParams: true })
  .get(
    '/',
    webAuthorization,
    checkAccessToProducts,
    getAll,
  )

  .get(
    '/:productId',
    webAuthorization,
    validators.getProduct,
    checkAccessToProducts,
    getOne,
  )

  .get(
    '/search',
    webAuthorization,
    validators.searchProducts,
    search,
  );
