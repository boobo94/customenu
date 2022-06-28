import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import i18n from './i18n';
import store from './store';

// setup axios

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.customenu.ro' : 'http://127.0.0.1:8001';
axios.defaults.baseURL = `${API_BASE_URL}/admin/v1`;
axios.defaults.headers['accept-language'] = i18n.locale || 'en';
axios.defaults.headers.authorization = localStorage.getItem('auth_token')
  ? `Bearer ${localStorage.getItem('auth_token')}`
  : null;

new Vue({
  i18n,
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
