<template>
  <div class="Vleaveform">
    <div class="calendar">
      <div
        class="cld"
        :style="{
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
        }"
      >
        <a-calendar
          :fullscreen="false"
          @select="onSelect"
          @panelChange="onPanelChange"
        />
      </div>
    </div>

    <div
      style="display: flex;
    flex-direction: column;
    height: 100%;
    padding: 15px;
    justify-content: space-evenly;"
    >
      <div
        class="div-leave"
        id="div-Sickleave"
        :style="`${status === '1' ? `height: 30%` : `height:40%`};`"
      >
        <router-link
          :to="{
            path: '/Vrequest',
            query: { id: `${lineId}`, type: 'Sickleave' },
          }"
        >
          <a-button class="btu-Sickleave">
            <p
              class="topicLeave"
              :style="
                `${calWidth > 650 ? `font-size: 16px` : `font-size: 14px`};`
              "
            >
              ลาป่วย
            </p>
            <div
              :style="
                `${calWidth > 650 ? `font-size: 14px` : `font-size: 12px`};`
              "
            >
              <span class="contentLeave" style="margin-right: 1em;"
                >ใช้ไป {{ sickLeaveUse }} วัน</span
              >
              <span class="contentLeave">เหลือ {{ sickLeaveAllday }} วัน</span>
            </div>
          </a-button>
        </router-link>
      </div>
      <div
        class="div-leave"
        id="div-Onleave"
        :style="`${status === '1' ? `height: 30%` : `height:40%`};`"
      >
        <router-link
          :to="{
            path: '/Vrequest',
            query: { id: `${lineId}`, type: 'Onleave' },
          }"
        >
          <a-button class="btu-Onleave">
            <p
              class="topicLeave"
              :style="
                `${calWidth > 650 ? `font-size: 16px` : `font-size: 14px`};`
              "
            >
              ลากิจ
            </p>
            <div
              :style="
                `${calWidth > 650 ? `font-size: 14px` : `font-size: 12px`};`
              "
            >
              <span class="contentLeave" style="margin-right: 1em;"
                >ใช้ไป {{ onLeaveUse }} วัน</span
              >
              <span class="contentLeave">เหลือ {{ onLeaveAllday }} วัน</span>
            </div>
          </a-button>
        </router-link>
      </div>

      <div v-if="status === '1'" class="div-leave" id="div-Adminleave">
        <a-button class="btu-Onleave">
          <p
            class="topicLeave"
            :style="
              `${calWidth > 650 ? `font-size: 16px` : `font-size: 14px`};`
            "
          >
            Admin ลาให้
          </p>
          <div
            :style="
              `${calWidth > 650 ? `font-size: 14px` : `font-size: 12px`};`
            "
          >
            <span class="contentLeave">กรณีที่พนักงานไม่สามารถลาเองได้</span>
          </div>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import apiConfig from "../config/api";

export default defineComponent({
  name: "Leaveform",
  data: () => ({
    apiconfig: apiConfig.API_BASE_ENDPOINT,
    lineId: "" as string,
    calHeigth: 0 as number,
    status: "" as string,
    calWidth: 0 as number,
    sickLeaveAllday: 5 as number,
    onLeaveAllday: 3 as number,
    sickLeaveUse: 0 as number,
    onLeaveUse: 0 as number,
  }),
  created() {
    // axios
    //   .post(`${this.apiconfig}/api/getrequest`, { lineId: this.lineId })
    //   .then((response) => {
    //     console.log("response: ", response.data.result);
    //     this.sickLeaveUse = response.data.result.sick.length;
    //     this.sickLeaveAllday -= this.sickLeaveUse;
    //     this.onLeaveUse = response.data.result.onleave.length;
    //     this.onLeaveAllday -= this.onLeaveUse;
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    axios
      .post(`${this.apiconfig}/api/getEvents`)
      .then((response) => {
        const result = response.data.responseBody;
        result.map((event: any) => {
          const start = event.start.dateTime || event.start.date;
          const end = event.end.dateTime || event.end.date;
          console.log(`${start} - ${end} Titel : ${event.summary}`);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.lineId = `${urlParams.get("id")}`;
    this.status = `${urlParams.get("status")}`;
    this.calHeigth = window.innerHeight;
    this.calWidth = window.innerWidth;
  },
});
</script>

<style scoped>
@font-face {
  font-family: Anuphan;
  src: url("../fonts/Anuphan-Regular.woff") format("woff");
}
.Vleaveform {
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}
.btu-Sickleave {
  text-align: end;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
}
.btu-Onleave {
  text-align: end;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
}
#div-Onleave {
  background-image: url("../assets/bg-Onleave.png");
}
#div-Sickleave {
  background-image: url("../assets/bg-Sickleave.png");
  background-size: initial;
}
#div-Adminleave {
  background-image: url("../assets/bg-Adminleave.png");
}
.cld {
  background: #ffffff;
  box-shadow: 0px 1px 0px #f2f2f2, inset 0px 1px 0px #f2f2f2,
    inset -1px 0px 0px #f2f2f2, inset 1px 0px 0px #f2f2f2;
}
.calendar {
  padding: 15px;
  background: #e9f0ff;
}

.div-leave {
  border-radius: 5px;
  height: 30%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
    0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 21px 8px rgba(0, 0, 0, 0.05);
}
p,
span {
  font-family: Anuphan;
}
.topicLeave {
  font-weight: 600;
  font-size: 18px;
}
</style>
