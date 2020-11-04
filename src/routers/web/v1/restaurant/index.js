import { Router } from 'express';
import webAuthorization from '../../../middleware/web-authorization';
import getOne from './get';

export default Router({ mergeParams: true })
  .get('/',
    webAuthorization,
    getOne);
