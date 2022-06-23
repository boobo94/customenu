import { Router } from 'express';
import getAll from './get-all';

export default Router()
  .get(
    '/',
    getAll,
  );
