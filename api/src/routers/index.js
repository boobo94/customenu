import { Router } from 'express';
import webRouter from './web';
import adminRouter from './admin';
import cdnRouter from './cdn';

export default Router()
  .get('/', (req, res) => res.end('Server is up and running...'))
  .use('/web', webRouter)
  .use('/admin', adminRouter)
  .use('/cdn', cdnRouter);
