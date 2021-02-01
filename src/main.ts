import {
  Button,
  Calendar,
  Checkbox,
  DatePicker,
  Icon,
  Input,
  Layout,
  Modal,
  Select,
  Tabs,
  Upload,
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import VCalendar from "v-calendar";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);
app.use(DatePicker);
app.use(Calendar);
app.use(Button);
app.use(Select);
app.use(Layout);
app.use(Icon);
app.use(Tabs);
app.use(Checkbox);
app.use(VCalendar);
app.use(Upload);
app.use(Modal);
app.use(Input);
app.use(router);
app.mount("#app");
