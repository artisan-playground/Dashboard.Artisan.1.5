<template>
  <form></form>
  <div class="From-leave">
    <p class="title-leave">จำนวนวันลาป่วยที่เหลือ ... วัน</p>
    <div>
      <p><span>*</span> ประเภทการลา</p>
      <a-input :value="typeleave" readonly />
    </div>
    <div>
      <p class="text"><span>* </span>ช่วงเวลา</p>
      <a-select
        placeholder="เลือกช่วงเวลาการลา"
        style="width: 100%;"
        v-model="typeTimeperiod"
        @change="changetypeTimeperiod"
      >
        <a-select-option value="1" style="font-family: Anuphan;">
          ครึ่งวัน (เช้า)
        </a-select-option>
        <a-select-option value="2" style="font-family: Anuphan;">
          ครึ่งวัน(บ่าย)
        </a-select-option>
        <a-select-option value="3" style="font-family: Anuphan;">
          เต็มวัน
        </a-select-option>
      </a-select>
      <div>
        <a-date-picker
          v-model="LeaveStartdate"
          format="YYYY-MM-DD"
          placeholder="Start"
          @change="changeLeaveStartDate"
        />
        <a-date-picker
          v-model="LeaveEnddate"
          format="YYYY-MM-DD"
          placeholder="End"
          @change="changeLeaveEndDate"
          :disabled="leaveStartdate === ''"
        />
      </div>
      <p class="title-leave"><span>* </span>เหตุผลการลา</p>
      <a-textarea
        class="box1"
        name="leave"
        v-model="detailLeave"
        placeholder="เขียนข้อความ"
      ></a-textarea>
    </div>
    <div>
      <p class="title-leave">แนบเอกสารการลา</p>
      <a-upload
        v-model:fileList="fileList"
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <loading-outlined v-if="loading" />
          <plus-outlined v-else />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </div>
    <div class="div-button-senddata">
      <a-button class="button-senddata" @click="submitLeave">ส่ง</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default defineComponent({
  name: "OnLeaveForm",
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  data: () => ({
    detailLeave: "" as string,
    typeTimeperiod: "" as string,
    typeleave: "ลากิจ" as string,
    leaveStartdate: "" as string,
    leaveEnddate: "" as string,
    openEndDate: true,
    loading: false as boolean,
    imageUrl: "" as string,
  }),
  methods: {
    changetypeTimeperiod(e: any) {
      this.typeTimeperiod;
    },

    changeLeaveStartDate(date: string, dateString: string) {
      this.leaveStartdate = dateString;
      if (this.leaveStartdate) {
        this.openEndDate = false;
      }
    },
    changeLeaveEndDate(date: string, dateString: string) {
      this.leaveEnddate = dateString;
      const startDateLeave = Date.parse(this.leaveStartdate);
      const endDateLeave = Date.parse(this.leaveEnddate);
      if (endDateLeave < startDateLeave) {
        message.error("วันสุดท้ายของการลา ต้องไม่น้อยกว่าวันเริ่ม");
      }
    },
    handleChange(info: any) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, (imageUrl: any) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
      if (info.file.status === "error") {
        this.loading = false;
      }
    },
    beforeUpload(file: any) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 2024 / 2024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  },
});
</script>

<style scoped>
.From-leave,
.div-button-senddata {
  padding: 15px;
}

.button-senddata {
  width: 100%;
  background-color: #134f83;
  color: white;
}
</style>
