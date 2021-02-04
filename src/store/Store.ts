import Vue from "vue";
import Vuex from "vuex";
import ModuleApp from "@/store/ModuleApp";
import ModuleContainers from "@/store/modules/ModuleContainers";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ModuleApp,
    ModuleContainers
  }
});
