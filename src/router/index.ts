import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Upper from "../views/Upper.vue";
import Vatslogin from "../views/Vatslogin.vue";
import Vatsclockout from "../views/Vatsclockout.vue";

import Vrequest from "../views/Vrequest.vue";
import Vleaveform from "../views/Vleaveform.vue";
import Clockin from "../views/Clockin.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Clockin",
    name: "Clockin",
    component: Clockin
  },
  {
    path: "/Upper",
    name: "Upper",
    component: Upper
  },
  {
    path: "/Vatslogin",
    name: "Vatslogin",
    component: Vatslogin
  },
  {
    path: "/Vatsclockout",
    name: "Vatsclockout",
    component: Vatsclockout
  },
  {
    path: "/Vrequest",
    name: "Vrequest",
    component: Vrequest
  },
  {
    path: "/Vleaveform",
    name: "Vleaveform",
    component: Vleaveform
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
