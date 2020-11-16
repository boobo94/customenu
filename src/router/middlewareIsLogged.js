import store from '../store';

export default (to, from, next) => {
  console.log('is logged', store.getters['authModule/isLoggedIn']);
  if (!store.getters['authModule/isLoggedIn']) {
    console.log('restart');
    next({ path: '/login' });
  }

  next();
};
