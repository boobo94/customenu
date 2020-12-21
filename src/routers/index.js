import { Router } from 'express';
import webRouter from './web';
import adminRouter from './admin';

export default Router()
  .get('/', (req, res) => res.end('Server is up and running...'))
  .use('/web', webRouter)
  .use('/admin', adminRouter);
