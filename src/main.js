import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers['accept-language'] = 'en';

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
