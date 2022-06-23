import { param } from 'express-validator';
import checkErrors from '../../../validation/checkErrors';

export const exportInvoice = [
  param(['restaurantId', 'paymentId'])
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];

export const getPayments = [
  param('restaurantId')
    .exists().withMessage('is required')
    .isInt()
    .withMessage('is int')
    .toInt(),

  checkErrors,
];
