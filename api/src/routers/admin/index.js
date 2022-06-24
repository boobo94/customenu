import { Router } from 'express';
import v1Router from './v1';

export default Router()
  .use('/v1', v1Router);
