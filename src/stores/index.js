import Vue from 'vue';
import Vuex from 'vuex';

import cocktailApi from './cocktail-api';
import drinks from './drinks';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    drinks,
    cocktailApi,
  }
});

export default store;
