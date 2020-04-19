import Vue from "vue";
import Vuex from "vuex";

import drinks from "./drinks";

Vue.use(Vuex);

const store = new Vuex.Store({
  ...drinks,
});

export default store;
