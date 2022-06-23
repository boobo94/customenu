import { param } from 'express-validator';
import checkErrors from './checkErrors';

export const checkId = [
  param('id')
    .exists().withMessage('is required')
    .isInt()
    .toInt(),
  checkErrors,
];

export const restaurantParam = [
  param('restaurant')
    .exists().withMessage('is required')
    .isString(),
  checkErrors,
];
