import Vue from 'vue';
import Vuex from 'vuex';

import refs from './modules/refs';
import hierarchy from './modules/hierarchy';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    refs,
    hierarchy,
  },
});
