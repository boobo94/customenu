import { Router } from 'express';
import webAuthorization from '../../../middleware/web-authorization';
import getAll from './get-all';
import getOne from './get';
import { getCategory } from './validator';

export default Router({ mergeParams: true })
  .get('/',
    webAuthorization,
    getAll)

  .get('/:productId',
    webAuthorization,
    getCategory,
    getOne);
