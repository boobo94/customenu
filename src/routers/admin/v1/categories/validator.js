import { body, param } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

export const getCategory = [
  param(['restaurantId', 'categoryId'])
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

export const postValidator = [
  param('restaurantId')
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  body(['category_i18ns.*.name', 'category_i18ns.*.lang_code'])
    .not().isEmpty().withMessage('is required')
    .isString()
    .withMessage('is string'),

  body('file')
    .optional()
    .isString()
    .withMessage('is string'),

  checkErrors,
];

export const putValidator = [
  param('restaurantId')
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  body('file')
    .optional()
    .isString()
    .withMessage('is string'),

  body(['category_i18ns.*.name', 'category_i18ns.*.lang_code'])
    .optional()
    .isString().withMessage('is string'),

  checkErrors,
];
