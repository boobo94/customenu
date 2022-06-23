import { body, param, query } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

export const getProduct = [
  param(['restaurantId', 'productId'])
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const getProducts = [
  param(['restaurantId'])
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const searchProducts = [
  param(['restaurantId'])
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  query(['keyword'])
    .exists().withMessage('is required')
    .isString()
    .withMessage('is string'),

  checkErrors,
];

export const postValidator = [
  param(['restaurantId'])
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  body(['categoryId'])
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  body(['product_i18ns.*.name', 'product_i18ns.*.description', 'product_i18ns.*.lang_code'])
    .exists().withMessage('is required')
    .isString()
    .withMessage('is string'),

  body(['product_i18ns.*.allergens', 'file'])
    .optional()
    .isString()
    .withMessage('is string'),

  checkErrors,
];

export const putValidator = [
  param(['restaurantId', 'productId'])
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  body('file')
    .optional()
    .isString()
    .withMessage('is string'),

  body(['product_i18ns.*.name', 'product_i18ns.*.description', 'product_i18ns.*.allergens', 'product_i18ns.*.lang_code'])
    .optional()
    .isString().withMessage('is string'),

  checkErrors,
];
