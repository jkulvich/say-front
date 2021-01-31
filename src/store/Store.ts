import Vue from "vue";
import Vuex from "vuex";
import ModuleApp from "@/store/ModuleApp";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ModuleApp
  }
});
