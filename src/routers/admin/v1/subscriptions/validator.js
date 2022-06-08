import { body, param } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

export const getMySubscription = [
  param(['restaurantId'])
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const deleteSubscription = [
  param(['restaurantId', 'subscriptionId'])
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const postValidator = [
  param('restaurantId')
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  body(['referenceId'])
    .exists().withMessage('is required')
    .isString()
    .withMessage('is string'),

  checkErrors,
];
