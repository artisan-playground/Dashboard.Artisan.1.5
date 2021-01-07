import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Vatslogin from "../views/Vatslogin.vue";
import Vatsclockout from "../views/Vatsclockout.vue";
import Vrequest from "../views/Vrequest.vue";
import Vleaveform from "../views/Vleaveform.vue";
import Clockin from "../views/Clockin.vue"

const routes: Array<RouteRecordRaw> = [

  {
    path: "/Clockin",
    name: "Clockin",
    component: Clockin
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
