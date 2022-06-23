import { Router, raw } from 'express';
import stripe from './stripe';

export default Router()

  .post(
    '/stripe',
    raw({ type: 'application/json' }),
    stripe,
  );
