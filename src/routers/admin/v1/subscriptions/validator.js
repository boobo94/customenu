import { body, param } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

export const getSubscription = [
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

  body(['refferenceId'])
    .exists().withMessage('is required')
    .isString()
    .withMessage('is string'),

  checkErrors,
];
