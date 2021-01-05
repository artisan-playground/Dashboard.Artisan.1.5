import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import VueMapbox from "vue-mapbox";
// import Mapbox from "mapbox-gl";
import 'ant-design-vue/dist/antd.css';
import {
  Button,
  Tabs,
  DatePicker,
  Calendar,
} from 'ant-design-vue';

  const app = createApp(App);
  app.use(DatePicker);
  app.use(Calendar);
  app.use(Button);
  app.use(Tabs);
  app.use(router);
  // app.use(VueMapbox, { mapboxgl: Mapbox })
  app.mount('#app');
