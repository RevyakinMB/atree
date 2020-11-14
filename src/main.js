import Vue from 'vue';
import VueScreen from 'vue-screen';
import VueI18n from 'vue-i18n';

import App from './App.vue';
import store from './store';
import { pluralizationRules, messages } from './i18n/tr';

Vue.config.productionTip = false;

Vue.use(VueScreen, {
  wide: 580,
});

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  formatFallbackMessages: true,
  messages,
  pluralizationRules,
});

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
