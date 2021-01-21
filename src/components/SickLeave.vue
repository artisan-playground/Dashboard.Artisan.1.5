<template>
  <div class="From-leave">
    <div>
      <p class="title-leave" style="top:0px">จำนวนวันลาป่วยที่เหลือ ... วัน</p>
    </div>
    <div>
      <p class="topic-leave"><span>*</span> ประเภทการลา</p>
      <a-input
        :value="typeleave"
        readonly
        style="border: 3px solid #d9d9d9 !important;border-radius: 2px;"
      />
    </div>

    <div>
      <p class="topic-leave"><span>* </span>ช่วงเวลา</p>
      <a-select
        placeholder="เลือกช่วงเวลาการลา"
        style="width: 100%;"
        v-model="typeTimeperiod"
        @change="changetypeTimeperiod"
      >
        <a-select-option value="ครึ่งวัน(เช้า)" style="font-family: Anuphan;">
          ครึ่งวัน (เช้า)
        </a-select-option>
        <a-select-option value="ครึ่งวัน(บ่าย)" style="font-family: Anuphan;">
          ครึ่งวัน (บ่าย)
        </a-select-option>
        <a-select-option value="เต็มวัน" style="font-family: Anuphan;">
          เต็มวัน
        </a-select-option>
      </a-select>
    </div>

    <div>
      <div v-if="typeTimeperiod === 'เต็มวัน' && leaveEnddate != ''">
        <p class="title-leave" v-if="dateLeave < remaindays">
          จำนวนวัน {{ dateLeave }} วัน
        </p>
        <p
          class="title-leave"
          style="color:red;"
          v-else-if="dateLeave > remaindays"
        >
          จำนวนวันลาของคุณเกินจำนวนแล้ว
        </p>
      </div>
      <div>
        <div style="width: 50%;float: left;">
          <p class="topic-leave"><span>*</span> เริ่ม</p>
        </div>
        <div style="width: 50%;float: right;">
          <p class="topic-leave" style="margin-left: 4%;"><span>*</span> ถึง</p>
        </div>
      </div>
      <div>
        <a-date-picker
          v-model="LeaveStartdate"
          format="YYYY-MM-DD"
          placeholder="Start"
          @change="changeLeaveStartDate"
        />
        <a-date-picker
          style="margin-left:4%;"
          v-model="LeaveEnddate"
          format="YYYY-MM-DD"
          placeholder="End"
          @change="changeLeaveEndDate"
          :disabled="leaveStartdate === ''"
        />
      </div>
    </div>
    <div>
      <p class="title-leave"><span>* </span>เหตุผลการลา</p>
      <textarea
        v-model="detailLeave"
        placeholder="เขียนข้อความ"
        style="width:100%"
      />
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
  name: "SickLeaveForm",
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  data: () => ({
    detailLeave: "" as string,
    typeTimeperiod: "" as string,
    typeleave: "ลาป่วย" as string,
    leaveStartdate: "" as string,
    leaveEnddate: "" as string,
    openEndDate: true,
    loading: false as boolean,
    dateLeave: 0 as number,
    remaindays: 5 as number,
    imageUrl: "" as string,
  }),
  methods: {
    changetypeTimeperiod(e: string) {
      this.typeTimeperiod = e;
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
      if (this.typeTimeperiod === "เต็มวัน") {
        if (endDateLeave < startDateLeave) {
          message.error("วันสุดท้ายของการลา ต้องไม่น้อยกว่าวันเริ่ม");
        } else {
          this.dateLeave = (endDateLeave - startDateLeave) / 86400000;
        }
      } else {
        if (endDateLeave != startDateLeave) {
          message.error("กรณีที่ลาครึ่งวัน วันในการลาต้องตรงกัน");
          this.dateLeave = 0.5;
        }
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
    submitLeave() {
      console.log("sdfsdfsdf");
    },
  },
});
</script>
<style scoped>
.From-leave {
  padding: 0 15px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.topic-leave {
  color: black;
  font-weight: 600;
}
span {
  color: red;
}
.button-senddata {
  width: 100%;
  background-color: #134f83;
  color: white;
}

.ant-calendar-picker {
  width: 48% !important;
  border: 3px solid #d9d9d9;
  border-radius: 2px;
}
.title-leave {
  color: #105efb;
  font-weight: 600;
}
textarea {
  border: 3px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
}
textarea:focus {
  border: 1px solid #105efb;
}
.ant-select-selector {
  border: 3px solid #d9d9d9 !important;
}
</style>
