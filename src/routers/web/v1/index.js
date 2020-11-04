import { Router } from 'express';

import categories from './categories';

export default Router({ mergeParams: true })
  .use('/categories', categories);
