import { Router } from 'express';
import authRouter from './auth';
import categoriesRouter from './categories';

export default Router()
  .use('/auth', authRouter)
  .use('/restaurants/:restaurantId/categories', categoriesRouter);
