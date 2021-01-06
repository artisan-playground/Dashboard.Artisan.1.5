import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'ant-design-vue/dist/antd.css';
import {
  Button,
  Tabs,
  DatePicker,
  Calendar,
  Modal
} from 'ant-design-vue';

  const app = createApp(App);
  app.use(DatePicker);
  app.use(Calendar);
  app.use(Button);
  app.use(Tabs);
  app.use(Modal);
  app.use(router);
  app.mount('#app');
