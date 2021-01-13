<template>
  <div class="Vonleave">
    <div>
      <a-tabs default-active-key="2" @change="callback">
        <a-tab-pane key="1" tab="ลาป่วย"></a-tab-pane>
        <a-tab-pane key="2" tab="ลากิจ"></a-tab-pane>
      </a-tabs>
    </div>
    <div class="box">
      <p class="text"><font color="red">* </font>ช่วงเวลา</p>
      <select class="options" v-model="option">
        <option value="" disabled selected>เลือกช่วงเวลาการลา</option>
        <option value="1">ครึ่งวัน(เช้า)</option>
        <option value="2">ครึ่งวัน(บ่าย)</option>
        <option value="3">เต็มวัน</option>
      </select>
    </div>
    <div class="box">
      <p class="text"><font color="red">* </font>เริ่ม</p>
      <a-date-picker
        v-model="startValue"
        :disabled-date="disabledStartDate"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Start"
        @change="onChangeStartDate"
      />
      <p class="text"><font color="red">* </font>ถึง</p>
      <a-date-picker
        v-model="endValue"
        :disabled-date="disabledEndDate"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="End"
        @change="onChangeEndDate"
      />
    </div>
    <div class="box">
      <p class="text"><font color="red">* </font>เหตุผลการลา</p>
      <a-textarea
        class="box1"
        name="leave"
        v-model="leave"
        placeholder="เขียนข้อความ"
      ></a-textarea>
    </div>
    <div class="box">
      <p class="text">แนบเอกสาร</p>
      <a-upload
        v-model:fileList="fileList"
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <!-- todo -->
          <loading-outlined v-if="loading" />
          <plus-outlined v-else />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>

      <div class="box">
        <p class="daily">Admin ลาให้</p>
        <a-input
          class="box1"
          name="leave"
          v-model="leave"
          placeholder="Member people"
        />
        <a-tooltip title="For admin only">
          <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </div>
      <div class="box">
        <a-button class="button" @click="request()">ส่ง</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, defineComponent } from "vue";
import store from "../store";
import axios from "axios";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import {
  PlusOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined,
    InfoCircleOutlined,
  },
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
      option: "",
      leave: "",
      fileList: [],
      loading: false,
      imageUrl: "",
    };
  },
  methods: {
    onChangeStartDate(date, dateString) {
      this.startValue = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    },
    onChangeEndDate(date, dateString) {
      this.endValue = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
      if (info.file.status === "error") {
        this.loading = false;
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === "image/jpg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  },
  request() {
    const payload = {
      Leavetype: this.option,
      Since: this.startValue,
      Until: this.endValue,
      Leaveevent: this.leave,
    };
    console.log(payload);
    axios
      .post(`http://172.16.3.33:8100/api/request`, payload)
      .then(function(response) {
        console.log(response.data.responseBody);
        console.log(response.data.responseCode);
        if (response.data.responseCode === 200) {
          alert(response.data.message);
        } else {
          alert("Success");
        }
      })
      .catch(function(error) {
        alert(error);
      });
  },

  callback(key) {
    console.log(key);
  },
});
</script>

<style scoped>
.Vonleave {
  position: relative;
  width: 100%;
  height: 812px;

  background: #ffffff;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  position: static;
  left: 0px;
  right: 0px;
  top: 300px;
  bottom: 0px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 0px 8px;
}
textarea.box1 {
  height: 98px;
  width: 330px;
  left: 0px;
  top: 0px;
  border-radius: 4px;
  padding: 1px, 2px, 1px, 2px;
  padding-left: 10px;
}
p.text {
  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
}
.options {
  height: 35px;
  width: 343px;
  left: 0px;
  top: 30px;
  padding: 1px, 2px, 1px, 2px;
  border-radius: 2px;
}
.button {
  font-family: Anuphan;
  width: 350px;
  height: 37px;
  border-radius: 2px;
  padding: 1px, 12px, 1px, 12px;
  background-color: #134f83;
  color: rgb(255, 255, 255);
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
  border: 2px solid #d3ecfd;
  border-radius: 2px;
  margin-left: -3px;
  margin-right: 16px;
  margin-top: 24px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
