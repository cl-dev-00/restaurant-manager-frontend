import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMasonry from "vue-masonry-css";
import Services from './services';

import {VueMaskDirective} from 'v-mask'

Vue.directive('mask', VueMaskDirective);

Vue.config.productionTip = false

Vue.use(VueMasonry);
Vue.use(
  function install(Vue, opts) {
    Vue.prototype.$services = Services;
  }
);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
