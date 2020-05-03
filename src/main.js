import Vue from 'vue'
import App from './App.vue'
import store from './stores';
import clickOutside from './directives/click-outside';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMinusCircle);

Vue.config.productionTip = false;
// font-awesome icons
Vue.component('fa-icon', FontAwesomeIcon);
Vue.directive('click-outside', clickOutside);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
