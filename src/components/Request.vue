<template>
  <div class="Vonleave">
    <div>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="ลาป่วย"></a-tab-pane>
        <a-tab-pane key="2" tab="ลากิจ" force-render></a-tab-pane>
      </a-tabs>
    </div>
    <div class="box">
      <p class="text"><font color="red">* </font>ช่วงเวลา</p>
      <select class="options" v-model="option">
        <option value="" disabled selected>เลือกช่วงเวลาการลา</option>
        <option value="1">เต็มวัน</option>
        <option value="2">ครึ่งวัน</option>
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
      <div>
        <a-upload
          list-type="picture"
          action="//jsonplaceholder.typicode.com/posts/"
          :preview-file="previewFile"
        >
          <a-button> <a-icon type="upload" /> Upload </a-button>
        </a-upload>
      </div>
    </div>
    <div class="box">
      <a-button class="button" @click="request()">ส่ง</a-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { computed, ref } from "vue";
import store from "../store";
import axios from "axios";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
export default {
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
      option: "",
      leave: "",
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
    previewFile(file) {
      console.log("Your upload file:", file);
      // Your process logic. Here we just mock to the same file
      return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
        method: "POST",
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail);
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
    //   return {
    //     option,
    //     startValue,
    //     endValue,
    //     leave,
    //     request,
    //   };
    // },
  },
  callback(key) {
    console.log(key);
  },
};
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
</style>
