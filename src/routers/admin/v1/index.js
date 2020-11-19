import { Router } from 'express';
import authRouter from './auth';
import categoriesRouter from './categories';
import productsRouter from './products';

export default Router()
  .use('/auth', authRouter)
  .use('/restaurants/:restaurantId/categories', categoriesRouter)
  .use('/restaurants/:restaurantId/products', productsRouter);
