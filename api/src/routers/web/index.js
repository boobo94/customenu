import { Router } from 'express';
import { restaurantParam } from '../validation/global';
import v1Router from './v1';

export default Router()
  .use('/v1/:restaurant', restaurantParam, v1Router);
