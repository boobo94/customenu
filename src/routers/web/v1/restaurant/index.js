import { Router } from 'express';
import webAuthorization from '../../../middleware/web-authorization';
import getOne from './get';
import oneSimple from './one-simple';

export default Router({ mergeParams: true })
  .use(webAuthorization)
  .get('/', getOne)
  .get('/simple', oneSimple);
