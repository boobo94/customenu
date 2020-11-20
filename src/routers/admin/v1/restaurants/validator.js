import { param } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

// eslint-disable-next-line import/prefer-default-export
export const getRestaurant = [
  param(['restaurantId'])
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];
