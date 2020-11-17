import axios from 'axios';

export default function axiosErrorInterceptor(store, router) {
  axios.interceptors.response.use(undefined, (err) => new Promise((resolve, reject) => {
    // eslint-disable-next-line no-underscore-dangle
    if (err.config && !err.config.__isRetryRequest && err.response.status === 401) {
      // when auth token is expired refresh it
      if (err.response.data.error.code === 3) {
        store.dispatch('authModule/refreshToken')
          .then(async () => {
          // rewrite the current Authorization header
            axios.defaults.headers.Authorization = `Bearer ${store.state.auth.token}`;
            // eslint-disable-next-line no-param-reassign
            err.config.headers.Authorization = axios.defaults.headers.Authorization;

            return axios(err.config)
              .then((response) => resolve(response))
              .catch((response) => reject(response));
          })
          .catch((error) => reject(error));
      } else {
        store.dispatch('authModule/logout');
        router.push({ path: '/login' });
      }
    }

    // if the server respond with an error
    if (err.response && err.response.data && err.response.data.error) {
      return reject(err.response.data.error);
    }

    return reject(err);
  }));
}
