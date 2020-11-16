import store from '../store';

export default (to, from, next) => {
  if (!store.getters['auth/isLoggedIn']) {
    next({ path: '/login' });
  }

  next();
};
