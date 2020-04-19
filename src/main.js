import Vue from 'vue'
import App from './App.vue'
import store from './stores';
import clickOutside from './directives/click-outside';
Vue.config.productionTip = false;

Vue.directive('click-outside', clickOutside);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
