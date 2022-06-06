import { param } from 'express-validator';
import checkErrors from '../../../../validation/checkErrors';

export const getPlan = [
  param(['restaurantId', 'planId'])
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const getPlans = [
  param('restaurantId')
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];
