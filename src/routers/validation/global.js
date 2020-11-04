import { param } from 'express-validator';
import checkErrors from './checkErrors';

export const checkId = [
  param('id')
    .not().isEmpty().withMessage('is required')
    .isInt()
    .toInt(),
  checkErrors,
];

export const restaurantParam = [
  param('restaurant')
    .not().isEmpty().withMessage('is required')
    .isString(),
  checkErrors,
];
