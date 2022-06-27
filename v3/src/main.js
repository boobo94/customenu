import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import i18n from './i18n'
import router from './router'
import axios from 'axios'

loadFonts()

const app = createApp(App)
  .use(router)
  .use(i18n)
  .use(vuetify)
  .use(createPinia())

router.isReady().then(() => {
  app.mount('#app')
})


axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://api.customenu.ro' : 'http://127.0.0.1:8001';
axios.defaults.headers['accept-language'] = localStorage.getItem("language") || 'en';
