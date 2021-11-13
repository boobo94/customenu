import { body } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

export const loginValidator = [
  body('email')
    .exists().withMessage('is required')
    .isString()
    .withMessage('should be string')
    .isEmail()
    .withMessage('should have a valid email format'),

  body('password')
    .exists().withMessage('is required')
    .isString()
    .withMessage('should be string'),
  checkErrors,
];

export const refreshTokenValidator = [
  body('refreshToken')
    .exists().withMessage('is required')
    .isUUID()
    .withMessage('should be valid refresh token'),

  checkErrors,
];

export const updateAdmin = [
  body('email')
    .exists().withMessage('is required')
    .isString()
    .withMessage('should be string')
    .isEmail()
    .withMessage('should have a valid email format'),

  body('password')
    .optional()
    .isString()
    .withMessage('should be string'),

  checkErrors,
];

export const register = [
  body('admin.email')
    .exists().withMessage('is required')
    .isString()
    .withMessage('should be string')
    .isEmail()
    .withMessage('should have a valid email format'),

  body('admin.password')
    .exists().withMessage('is required')
    .isString()
    .withMessage('should be string'),

  body('restaurant.shortUrl')
    .exists().withMessage('is required')
    .isString()
    .withMessage('should be string'),

  body('restaurant.file')
    .optional()
    .isString()
    .withMessage('is string'),

  body(['restaurant.currency', 'restaurant.email', 'restaurant.phone', 'restaurant.address', 'restaurant.instagramUrl', 'restaurant.facebookUrl', 'restaurant.youtubeUrl'])
    .optional()
    .isString().withMessage('is string'),

  body(['restaurant.languages'])
    .optional()
    .isArray().withMessage('is array'),
  body(['restaurant.languages.*'])
    .exists().withMessage('is required')
    .isString()
    .withMessage('is string'),

  body(['restaurant.restaurant_i18ns.*.name', 'restaurant.restaurant_i18ns.*.description', 'restaurant.restaurant_i18ns.*.lang_code'])
    .exists().withMessage('is required')
    .isString()
    .withMessage('is string'),

  checkErrors,
];
