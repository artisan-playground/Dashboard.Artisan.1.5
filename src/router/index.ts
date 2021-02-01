import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Clockin from "../views/Clockin.vue";
import Listleaves from "../views/Listleaves.vue";
import Vatsclockout from "../views/Vatsclockout.vue";
import Vatslogin from "../views/Vatslogin.vue";
import Vleaveform from "../views/Vleaveform.vue";
import Vrequest from "../views/Vrequest.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/Clockin",
    name: "Clockin",
    component: Clockin,
  },
  {
    path: "/Listleaves",
    name: "Listleaves",
    component: Listleaves,
  },
  {
    path: "/Vatslogin",
    name: "Vatslogin",
    component: Vatslogin,
  },
  {
    path: "/Vatsclockout",
    name: "Vatsclockout",
    component: Vatsclockout,
  },
  {
    path: "/Vrequest",
    name: "Vrequest",
    component: Vrequest,
  },
  {
    path: "/Vleaveform",
    name: "Vleaveform",
    component: Vleaveform,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
