import { param } from 'express-validator';
import checkErrors from '../../../../validation/checkErrors';

// eslint-disable-next-line import/prefer-default-export
export const getProduct = [
  param('productId')
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];