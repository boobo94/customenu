import { Router } from 'express';
import * as validators from './validator';
import loginApi from './login';
import refreshToken from './refresh-token';
import update from './update';

export default Router()
  .post('/login',
    validators.loginValidator,
    loginApi)
  .post('/refresh-token',
    validators.refreshTokenValidator,
    refreshToken)
  .put('/profile',
    validators.updateAdmin,
    update);
