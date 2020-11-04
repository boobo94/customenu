import { validationResult } from 'express-validator';
import statusCodes from '../utils/statusCodes';

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(statusCodes.ENTITY_NOT_PROCESSED).json({ errors: errors.array() });
  }

  return next();
};
