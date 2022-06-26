import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import i18n from './i18n'

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.customenu.ro' : 'http://127.0.0.1:8000';
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers['accept-language'] = i18n.locale || 'en';

createApp(App)
  .use(i18n)
  .use(router)
  .use(i18n)
  .mount('#app')
