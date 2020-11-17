import { param } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

export const getCategory = [
  param('categoryId')
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const getCategories = [
  param('restaurantId')
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];
