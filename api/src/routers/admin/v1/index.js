import { Router } from 'express';
import authRouter from './auth';
import restaurantsRouter from './restaurants';
import categoriesRouter from './categories';
import productsRouter from './products';
import subscriptionsRouter from './subscriptions';
import paymentsRouter from './payments';
import countriesRouter from './countries';

export default Router()
  .use('/auth', authRouter)
  .use('/countries', countriesRouter)
  .use('/restaurants', restaurantsRouter)
  .use('/restaurants/:restaurantId/categories', categoriesRouter)
  .use('/restaurants/:restaurantId/products', productsRouter)
  .use('/restaurants/:restaurantId/subscriptions', subscriptionsRouter)
  .use('/restaurants/:restaurantId/payments', paymentsRouter);
