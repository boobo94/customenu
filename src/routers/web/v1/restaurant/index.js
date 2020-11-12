import { Router } from 'express';
import webAuthorization from '../../../middleware/web-authorization';
import getOne from './get';
import oneSimple from './one-simple';

export default Router({ mergeParams: true })
  .get('/',
    webAuthorization,
    getOne)

  .get('/simple',
    webAuthorization,
    oneSimple);
