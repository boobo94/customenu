import { body, param } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

export const getSubcategory = [
  param(['restaurantId', 'categoryId', 'subcategoryId'])
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const getSubcategories = [
  param(['restaurantId', 'categoryId'])
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const postValidator = [
  param(['restaurantId', 'categoryId'])
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  body(['subcategory_i18ns.*.name', 'subcategory_i18ns.*.lang_code'])
    .not().isEmpty().withMessage('is required')
    .isString()
    .withMessage('is string'),

  body('image')
    .optional()
    .isString()
    .withMessage('is string'),

  checkErrors,
];

export const putValidator = [
  param(['restaurantId', 'categoryId', 'subcategoryId'])
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  body(['image'])
    .optional()
    .isString().withMessage('is string'),

  body(['subcategory_i18ns.*.name', 'subcategory_i18ns.*.lang_code'])
    .optional()
    .isString().withMessage('is string'),

  checkErrors,
];
