import Vue from 'vue';
import Vuex from 'vuex';

import authModule from './authModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // store modules
    authModule,

  },
});
