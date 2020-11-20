import { Router } from 'express';
import authRouter from './auth';
import restaurantsRouter from './restaurants';
import categoriesRouter from './categories';
import productsRouter from './products';

export default Router()
  .use('/auth', authRouter)
  .use('/restaurants', restaurantsRouter)
  .use('/restaurants/:restaurantId/categories', categoriesRouter)
  .use('/restaurants/:restaurantId/products', productsRouter);
