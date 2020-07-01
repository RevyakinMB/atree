import Vue from 'vue';
import VueScreen from 'vue-screen';

import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueScreen, {
  wide: 580,
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
