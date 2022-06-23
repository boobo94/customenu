import { Router } from 'express';
import getFile from './get-file';

export default Router()
  .get('/:fileName', getFile);
