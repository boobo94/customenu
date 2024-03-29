import { Router } from 'express';

import restaurantRouter from './restaurant';
import categoryRouter from './categories';
import productRouter from './categories/products';

export default Router({ mergeParams: true })
  .use('/', restaurantRouter)
  .use('/categories', categoryRouter)
  .use('/products', productRouter);
