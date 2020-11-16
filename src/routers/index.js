import { Router } from 'express';
import language from './middleware/language';
import webRouter from './web';
import adminRouter from './admin';

export default Router()
  .use(language)
  .get('/', (req, res) => res.end('Server is up and running...'))
  .use('/web', webRouter)
  .use('/admin', adminRouter);
