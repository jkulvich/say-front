import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PageMain from "@/views/Main.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Main",
    component: PageMain
  }
];

const router = new VueRouter({
  routes
});

export default router;
