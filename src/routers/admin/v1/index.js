import { Router } from 'express';
import authRouter from './auth';

export default Router()
  .use('/auth', authRouter);
