import store from '../store';

export default (to, from, next) => {
  if (!store.getters['authModule/isLoggedIn']) {
    next({ path: '/login' });
  }

  next();
};
