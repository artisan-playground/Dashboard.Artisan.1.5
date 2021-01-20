<template>
  <div class="From-leave">
    <p class="title-leave">จำนวนวันลาป่วยที่เหลือ ... วัน</p>
    <div>
      <p><span>*</span> ประเภทการลา</p>
      <a-input value="ลาป่วย" readonly />
    </div>
    <div>
      <p class="text"><span>* </span>ช่วงเวลา</p>
      <a-select placeholder="เลือกช่วงเวลาการลา" style="width: 100%">
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
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Start"
          :disabled-date="disabledDate"
          @change="changeLeaveStartDate"
        />
        <a-date-picker
          v-model="LeaveEnddate"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="End"
          :disabled="leaveStartdate === ''"
        />
      </div>
      <p class="title-leave"><span>* </span>เหตุผลการลา</p>
      <a-textarea
        class="box1"
        name="leave"
        v-model="leave"
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
      <a-button class="button-senddata" @click="request">ส่ง</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "SickLeaveForm",
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  data: () => ({
    leaveStartdate: "" as string,
    leaveEnddate: "" as string,
    openEndDate: true,
  }),
  methods: {
    changeLeaveStartDate(date: string, dateString: string) {
      this.leaveStartdate = dateString;
      if (this.leaveStartdate) {
        this.openEndDate = false;
      }
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
