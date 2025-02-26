import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/Store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import "@/assets/styles/main.sass";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
