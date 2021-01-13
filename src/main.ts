import {
  Button,
  Calendar,
  DatePicker,
  Modal,
  Tabs,
  Upload,
  Form,
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(DatePicker);
app.use(Calendar);
app.use(Button);
app.use(Tabs);
app.use(Upload);
app.use(Modal);
app.use(Form);
app.use(router);
app.mount("#app");
