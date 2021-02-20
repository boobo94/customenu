import { body, param } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

export const getProduct = [
  param(['restaurantId', 'productId'])
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const getProducts = [
  param(['restaurantId'])
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const postValidator = [
  param(['restaurantId'])
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  body(['subcategoryId'])
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  body(['product_i18ns.*.name', 'product_i18ns.*.description', 'product_i18ns.*.allergens', 'product_i18ns.*.lang_code'])
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
  param(['restaurantId', 'productId'])
    .not().isEmpty().withMessage('is required')
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
