import { Router } from 'express';
import * as validators from './validator';
import loginApi from './login';
import refreshToken from './refresh-token';
import update from './update';
import get from './get';
import { checkAccessToUpdateProfile } from './permissions';
import register from './register';

export default Router()
  .post('/login',
    validators.loginValidator,
    loginApi)
  .post('/register',
    validators.register,
    register)
  .post('/refresh-token',
    validators.refreshTokenValidator,
    refreshToken)
  .get('/profile',
    get)
  .put('/profile',
    validators.updateAdmin,
    checkAccessToUpdateProfile,
    update);
