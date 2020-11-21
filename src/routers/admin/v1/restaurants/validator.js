import { body, param } from 'express-validator';
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

export const putValidator = [
  param(['restaurantId'])
    .not().isEmpty().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  body(['logo'])
    .optional()
    .isString().withMessage('is string'),

  body(['currency', 'email', 'phone', 'address', 'instagramUrl', 'facebookUrl', 'youtubeUrl'])
    .optional()
    .isString().withMessage('is string'),

  body(['languages'])
    .optional()
    .isArray().withMessage('is array'),
  body(['languages.*'])
    .not().isEmpty().withMessage('is required')
    .isString()
    .withMessage('is string'),

  body(['restaurant_i18ns.*.name', 'restaurant_i18ns.*.description', 'restaurant_i18ns.*.allergens', 'restaurant_i18ns.*.lang_code'])
    .optional()
    .isString().withMessage('is string'),

  checkErrors,
];
