import { Router } from 'express';
import webAuthorization from '../../../middleware/web-authorization';
import productRouter from '../products';
import getAll from './get-all';
import getOne from './get';
import { getSubcategory } from './validator';

export default Router({ mergeParams: true })
  .get('/',
    webAuthorization,
    getAll)

  .get('/:subcategoryId',
    webAuthorization,
    getSubcategory,
    getOne)

  .use('/:subcategoryId/products', productRouter);
