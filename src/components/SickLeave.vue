<template>
  <div class="From-leave">
    <div>
      <p
        class="title-leave"
        style="top:0px"
        v-if="status === '2' || countUsers < 2"
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
        <p class="title-leave" v-if="dateLeave < remaindays ">
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
          :disabled-date="disabledDate"
          v-model="LeaveStartdate"
          format="DD-MM-YYYY"
          placeholder="Select date"
          @change="changeLeaveStartDate"
        />
        <a-date-picker
          :disabled-date="disabledDate"
          style="margin-left:4%;"
          v-model="LeaveEnddate"
          format="DD-MM-YYYY"
          placeholder="Select date"
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

    <div v-if="countUsers > 1">
      <p class="title-leave"><span class="Highlight">* </span> Admin ลาให้</p>
      <a-select
        mode="multiple"
        :default-value="leaveList"
        style="width: 100%"
        placeholder="Member people"
        @change="addListleave"
      >
        <a-select-option v-for="item in allUsers" :key="item.email">
          <span v-if="item.image === null" style="margin-right: 10px;"
            ><img
              src="../assets/user.png"
              alt=""
              style="width:20px;height:20px;border-radius: 50%;"
          /></span>
          <span v-else style="margin-right: 10px;">
            <img
              :src="item.image.fullPath"
              alt=""
              style="width:20px;height:20px;border-radius: 50%;"
            />
          </span>
          {{ item.name }}
        </a-select-option>
      </a-select>
    </div>
    <div class="div-button-senddata">
      <a-button
        class="button-senddata"
        @click="submitLeave"
        :style="
          `${
            Timeperiod != '' &&
            leaveStartdate != '' &&
            leaveEnddate != '' &&
            detailLeave != ''
              ? `background: #134f83`
              : `background: #134f8331`
          }`
        "
        :disabled="
          Timeperiod == '' ||
            leaveStartdate == '' ||
            leaveEnddate == '' ||
            detailLeave == ''|| 
            dateLeave > remaindays
        "
        >ส่ง</a-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import getallUser from "../constant/users";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import apiConfig from "../config/api";

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default defineComponent({
  name: "Sickleaveform",
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  data: () => ({
    typeLeaves: "" as string,
    apiconfig: apiConfig.API_BASE_ENDPOINT,
    lineId: "" as string,
    status: "" as string,
    detailLeave: "" as string,
    typeTimeperiod: "" as string,
    typeleave: "ลาป่วย" as string,
    leaveStartdate: "" as string,
    leaveEnddate: "" as string,
    openEndDate: true,
    loading: false as boolean,
    dateLeave: 0 as number,
    remaindays: 0 as number,
    imageUrl: "" as string,
    since: "" as string,
    emailUsers: "" as string,
    until: "" as string,
    countUsers: 0 as number,
    allUsers: [] as object[],
    leaveList: [] as string[],
    startDate:"" as string,
    endDate:"" as string,
    nameLeaves:"" as string
  }),
  methods: {
    addListleave(value: string | object[] | any) {
      this.leaveList = value;
    },
    disabledDate(current: number | object) {
      return current && current.valueOf() < Date.now() - 86400000;
    },
    changetypeTimeperiod(e: string) {
      this.typeTimeperiod = e;
    },
    changeLeaveStartDate(date: string, dateString: string) {
      this.leaveStartdate = dateString;
      const dateStartAll = this.leaveStartdate.split("-");
      const dateStart = `${dateStartAll[2]}-${dateStartAll[1]}-${dateStartAll[0]}`;
      const dateEndAll = this.leaveEnddate.split("-");
      const endStart = `${dateEndAll[2]}-${dateEndAll[1]}-${dateEndAll[0]}`;
      const startDateLeave = Date.parse(dateStart);
      const endDateLeave = Date.parse(endStart);

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
      const dateStartAll = this.leaveStartdate.split("-");
      const dateStart = `${dateStartAll[2]}-${dateStartAll[1]}-${dateStartAll[0]}`;
      this.startDate =dateStart
      const dateEndAll = this.leaveEnddate.split("-");
      const endDate = `${dateEndAll[2]}-${dateEndAll[1]}-${dateEndAll[0]}`;
      this.endDate = endDate
      const startDateLeave = Date.parse(dateStart);
      const endDateLeave = Date.parse(endDate);

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
        getBase64(info.file.originFileObj, (imageUrl: string) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },

    beforeUpload(file: any) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG file!");
      }
      return isJpgOrPng;
    },
    submitLeave() {
      if (this.typeLeaves === "LeavesOther") {
        axios.post(`${this.apiconfig}/api/Adminrequest`, {
          lineId: this.lineId,
          Leavetype: this.typeleave,
          Timeperiod: this.typeTimeperiod,
          Since: this.leaveStartdate,
          Until: this.leaveEnddate,
          CountLeave: this.dateLeave,
          Leaveevent: this.detailLeave,
          leaveList: this.leaveList,
          Leavefor:"admin"
        }).then((response) => {
          this.nameLeaves = response.data.responseBody
          this.createEvents()
        });
      } else {
        axios.post(`${this.apiconfig}/api/Userrequest`, {
          lineId: this.lineId,
          Leavetype: this.typeleave,
          Timeperiod: this.typeTimeperiod,
          Since: this.leaveStartdate,
          Until: this.leaveEnddate,
          CountLeave: this.dateLeave,
          Leaveevent: this.detailLeave,
          Leavefor:"user"
        }).then((response) => {
          console.log(response);
          
          this.createEvents()
        });
      }
    },
    createEvents(){
      if (this.typeTimeperiod === "ครึ่งวัน(เช้า)") {
        this.since = `${this.startDate}T09:00:00`;
        this.until = `${this.endDate}T13:00:00`;
      } else if (this.typeTimeperiod === "ครึ่งวัน(บ่าย)") {
        this.since = `${this.startDate}T13:00:00`;
        this.until = `${this.endDate}T18:00:00`;
      } else {
        this.since = `${this.startDate}T9:00:00`;
        this.until = `${this.endDate}T18:00:00`;
      }
      const summary = `${this.nameLeaves} [${this.typeleave}]`

      axios.post(`${this.apiconfig}/api/createEvents`, {
        Leaveevent: this.detailLeave,
        lineId: this.lineId,
        Sammary:summary ,
        typeLeaves: this.typeLeaves,
        description: this.detailLeave,
        Since: this.since,
        Until: this.until,
      });

    }
  },
  mounted() {
    getallUser().then((result) => (this.allUsers = result.data.users));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.status = `${urlParams.get("status")}`;
    if (localStorage.getItem("ListUsersOnleave")) {
      const list: object | any = localStorage.getItem("ListUsersOnleave");
      const allList = JSON.parse(list);
      this.typeLeaves = allList.typeLeaves;
      this.leaveList = allList.listUsers;
      this.countUsers = allList.listUsers.length;

      if (this.typeLeaves === "LeavesOther") {
        if (this.countUsers === 1) {
          this.emailUsers = allList.listUsers[0];
        }
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
          this.remaindays = response.data.responseBody.Sickleave;
          this.nameLeaves = response.data.responseBody.name
        } else {
          this.remaindays = 5;
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
