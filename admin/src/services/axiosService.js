import axios from 'axios';
import handleError from './error';

export default function axiosErrorInterceptor(store, router) {
  axios.interceptors.response.use(undefined, (err) => new Promise((resolve, reject) => {
    // eslint-disable-next-line no-underscore-dangle
    if (err.config && !err.config.__isRetryRequest && err.response.status === 401) {
      // when auth token is expired refresh it
      if (err.response.data.error.code === 3) {
        return store.dispatch('authModule/refreshToken')
          .then(async () => {
            // rewrite the current Authorization header
            axios.defaults.headers.authorization = `Bearer ${store.state.authModule.token}`;
            // eslint-disable-next-line no-param-reassign
            err.config.headers.authorization = axios.defaults.headers.authorization;

            return axios(err.config)
              .then((response) => resolve(response))
              .catch((response) => reject(response));
          })
          .catch((error) => reject(error));
      } else {
        store.dispatch('authModule/logout');
        if (router.currentRoute.name !== 'Login') {
          router.push({ path: '/login' });
        }
      }
    }

    // if the server respond with an error
    if (err.response && err.response.data && err.response.data.error) {
      handleError(err.response.data.error);
      return reject(err.response.data.error);
    }

    return reject(err);
  }));
}
