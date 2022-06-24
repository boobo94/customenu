import { Router } from 'express';
import webAuthorization from '../../../../middleware/web-authorization';
import getAll from './get-all';
import getOne from './get';
import { getProduct } from './validator';
import { checkAccessToProducts } from './permissions';

export default Router({ mergeParams: true })
  .get('/',
    webAuthorization,
    checkAccessToProducts,
    getAll)

  .get('/:productId',
    webAuthorization,
    getProduct,
    checkAccessToProducts,
    getOne);
