import { body, param } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

export const getTable = [
  param(['restaurantId', 'tableId'])
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const getTables = [
  param('restaurantId')
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

  body(['name'])
    .exists().withMessage('is required')
    .isString()
    .withMessage('is string'),

  checkErrors,
];
