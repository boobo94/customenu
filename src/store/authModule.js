import axios from 'axios';
import handleError from '../services/error';

const ROUTE_LOGIN = '/auth/login';
const ROUTE_REFRESH_TOKEN = '/auth/refresh-token';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('auth_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    restaurantId: localStorage.getItem('restaurantId') || null,
    languages: ['en', 'ro'], // todo: get this from restaurant
  },
  mutations: {
    login(state, response) {
      state.token = response.token;
      state.refreshToken = response.refreshToken;
      state.restaurantId = response.restaurantId;
    },
    logout(state) {
      state.token = null;
      state.refreshToken = null;
    },
  },
  actions: {
    async login({ commit }, body) {
      try {
        const { data } = await axios.post(ROUTE_LOGIN, body);

        const { token, refreshToken, restaurantId } = data;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('restaurantId', restaurantId);

        // set the authorization header after login for axios
        axios.defaults.headers.authorization = `Bearer ${token}`;

        commit('login', data);
      } catch (e) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('restaurantId');
        commit('logout');
        handleError(e);
      }
    },

    logout({ commit }) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('restaurantId');
      commit('logout');
    },

    async refreshToken({ commit }) {
      try {
        const { data } = await axios.post(ROUTE_REFRESH_TOKEN, {
          refreshToken: localStorage.getItem('refresh_token'),
        });

        if (data.error) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('restaurantId');
        } else {
          const { token, refreshToken, restaurantId } = data;
          localStorage.setItem('auth_token', token);
          localStorage.setItem('refresh_token', refreshToken);
          localStorage.setItem('restaurantId', restaurantId);

          commit('login', data);
        }
      } catch (e) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('restaurantId');
        commit('logout');
        handleError(e);
      }
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.token !== null;
    },
  },
};
