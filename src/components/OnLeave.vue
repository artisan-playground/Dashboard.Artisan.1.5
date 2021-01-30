<template>
  <div class="From-leave">
    <div>
      <p
        class="title-leave"
        style="top:0px"
        v-if="typeLeaves === '' || countUsers < 2"
      >
        จำนวนวันลาป่วยที่เหลือ {{ remaindays }} วัน
      </p>
    </div>
    <div>
      <p class="topic-leave"><span class="Highlight">*</span> ประเภทการลา</p>
      <a-input :value="typeleave" readonly style="border-radius: 2px;" />
    </div>

    <div>
      <p class="topic-leave"><span class="Highlight">* </span>ช่วงเวลา</p>
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
      <div
        v-if="
          typeTimeperiod === 'เต็มวัน' &&
            leaveEnddate != '' &&
            leaveStartdate != ''
        "
      >
        <p class="title-leave" v-if="dateLeave < remaindays || countUsers > 2">
          จำนวนวัน {{ dateLeave }} วัน
        </p>
        <p
          class="title-leave"
          style="color:red;"
          v-else-if="dateLeave > remaindays && countUsers < 2"
        >
          จำนวนวันลาของคุณเกินจำนวนแล้ว
        </p>
      </div>
      <div>
        <div style="width: 50%;float: left;">
          <p class="topic-leave"><span class="Highlight">*</span> เริ่ม</p>
        </div>
        <div style="width: 50%;float: right;">
          <p class="topic-leave" style="margin-left: 4%;">
            <span class="Highlight">*</span> ถึง
          </p>
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
      <p class="title-leave"><span class="Highlight">* </span>เหตุผลการลา</p>
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

    <div v-if="status === '1'">
      <p class="title-leave"><span class="Highlight">* </span> Admin ลาให้</p>
      <a-input placeholder="Member people"> </a-input>
    </div>

    <div class="div-button-senddata">
      <a-button class="button-senddata" @click="submitLeave">ส่ง</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import apiConfig from "../config/api";

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default defineComponent({
  name: "Onleaveform",
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  data: () => ({
    apiconfig: apiConfig.API_BASE_ENDPOINT,
    lineId: "" as string,
    status: "" as string,
    typeLeaves: "" as string,
    detailLeave: "" as string,
    typeTimeperiod: "" as string,
    typeleave: "ลากิจ" as string,
    leaveStartdate: "" as string,
    leaveEnddate: "" as string,
    openEndDate: true,
    loading: false as boolean,
    dateLeave: 0 as number,
    remaindays: 0 as number,
    imageUrl: "" as string,
    Since: "" as string,
    emailUsers: "" as string,
    Until: "" as string,
    countUsers: 0 as number,
  }),
  methods: {
    changetypeTimeperiod(e: string) {
      this.typeTimeperiod = e;
    },

    changeLeaveStartDate(date: string, dateString: string) {
      this.leaveStartdate = dateString;
      const startDateLeave = Date.parse(this.leaveStartdate);
      const endDateLeave = Date.parse(this.leaveEnddate);
      if (this.leaveStartdate) {
        this.openEndDate = false;
        if (this.typeTimeperiod === "เต็มวัน") {
          if (endDateLeave < startDateLeave) {
            message.error("วันสุดท้ายของการลา ต้องไม่น้อยกว่าวันเริ่ม");
          } else {
            const dateLeave = (endDateLeave - startDateLeave) / 86400000;
            if (dateLeave === 0) {
              this.dateLeave = 1;
            } else {
              this.dateLeave = (endDateLeave - startDateLeave) / 86400000 + 1;
            }
          }
        }
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
          const dateLeave = (endDateLeave - startDateLeave) / 86400000;
          if (dateLeave === 0) {
            this.dateLeave = 1;
          } else {
            this.dateLeave = (endDateLeave - startDateLeave) / 86400000 + 1;
          }
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
      axios.post(`${this.apiconfig}/api/request`, {
        lineId: this.lineId,
        Leavetype: this.typeleave,
        Timeperiod: this.typeTimeperiod,
        Since: this.leaveStartdate,
        Until: this.leaveEnddate,
        CountLeave: this.dateLeave,
        Leaveevent: this.detailLeave,
      });

      if (this.typeTimeperiod === "ครึ่งวัน(เช้า)") {
        this.Since = `${this.leaveStartdate}T09:00:00`;
        this.Until = `${this.leaveEnddate}T13:00:00`;
      } else if (this.typeTimeperiod === "ครึ่งวัน(บ่าย)") {
        this.Since = `${this.leaveStartdate}T13:00:00`;
        this.Until = `${this.leaveEnddate}T18:00:00`;
      } else {
        this.Since = `${this.leaveStartdate}T9:00:00`;
        this.Until = `${this.leaveEnddate}T18:00:00`;
      }

      axios
        .post(`${this.apiconfig}/api/createEvents`, {
          Sammary: this.typeleave,
          description: this.detailLeave,
          Since: this.Since,
          Until: this.Until,
        })
        .then(() => {
          localStorage.clear();
        });
    },
  },
  mounted() {
    const list: object | any = localStorage.getItem("ListUsersOnleave");
    const allList = JSON.parse(list);
    this.typeLeaves = allList.typeLeaves;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.countUsers = allList.listUsers.length;
    this.status = `${urlParams.get("status")}`;
    if (this.typeLeaves === "LeavesOther") {
      if (this.countUsers === 1) {
        this.emailUsers = allList.listUsers[0];
      }
    }
    const result = {
      UserlineId: this.lineId = `${urlParams.get("id")}`,
      status: this.typeLeaves,
      username: this.emailUsers,
    };
    axios
      .post(`${this.apiconfig}/api/getrequest`, result)
      .then((response) => {
        if (response.data.responseCode === 200) {
          this.remaindays = response.data.responseBody.Onleave;
        } else {
          this.remaindays = 3;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
});
</script>

<style scoped>
@import "../assets/styles/Requestform.css";
</style>
