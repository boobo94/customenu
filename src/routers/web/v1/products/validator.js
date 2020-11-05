import { param } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

// eslint-disable-next-line import/prefer-default-export
export const getCategory = [
  param('categoryId')
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];
