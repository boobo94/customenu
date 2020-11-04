import { Router } from 'express';

import restaurantRouter from './restaurant';
import categoryRouter from './categories';

export default Router({ mergeParams: true })
  .use('/', restaurantRouter)
  .use('/categories', categoryRouter);
