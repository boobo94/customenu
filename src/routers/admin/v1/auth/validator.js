import { body } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

export const loginValidator = [
  body('email')
    .not().isEmpty().withMessage('is required')
    .isString()
    .withMessage('should be string')
    .isEmail()
    .withMessage('should have a valid email format'),

  body('password')
    .not().isEmpty().withMessage('is required')
    .isString()
    .withMessage('should be string'),
  checkErrors,
];

export const refreshTokenValidator = [
  body('refreshToken')
    .not().isEmpty().withMessage('is required')
    .isUUID()
    .withMessage('should be valid refresh token'),

  checkErrors,
];

export const updateAdmin = [
  body('email')
    .not().isEmpty().withMessage('is required')
    .isString()
    .withMessage('should be string')
    .isEmail()
    .withMessage('should have a valid email format'),

  body('password')
    .not().isEmpty().withMessage('is required')
    .isString()
    .withMessage('should be string'),

  checkErrors,
];
