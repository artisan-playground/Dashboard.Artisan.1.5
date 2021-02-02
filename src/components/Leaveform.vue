<template>
  <div class="Vleaveform">
    <div class="calendar">
      <div class="cld">
        <v-calendar
          is-expanded
          :columns="$screens({ lg: 2 }, 1)"
          :min-date="new Date()"
          :attributes="allEvents"
          style="font-family: Anuphan;"
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
        <a-button class="btu-Sickleave" @click="gotoSickleaves">
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
            <span class="contentLeave">เหลือ {{ remainSickLeave }} วัน</span>
          </div>
        </a-button>
      </div>
      <div
        class="div-leave"
        id="div-Onleave"
        :style="`${status === '1' ? `height: 30%` : `height:40%`};`"
      >
        <a-button class="btu-Onleave" @click="gotoOnleaves">
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
            <span class="contentLeave">เหลือ {{ remainOnLeave }} วัน</span>
          </div>
        </a-button>
      </div>

      <div v-if="status === '1'" class="div-leave" id="div-Adminleave">
        <a-button class="btu-Onleave" @click="goTopage">
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
      <div>
        <a-modal :visible="visible" @cancel="handleCancel" footer="">
          <div>
            <a-button @click="recordUsersleave">Enter</a-button>
          </div>

          <div style="margin-top: 10px;"></div>
        </a-modal>
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
    visible: false as boolean,
    status: "" as string,
    calWidth: 0 as number,
    sickLeaveAllday: 5 as number,
    onLeaveAllday: 3 as number,
    sickLeaveUse: 0 as number,
    onLeaveUse: 0 as number,
    remainSickLeave: 0 as number,
    remainOnLeave: 0 as number,
    descriptionLeave: "" as string,
    holiday: [] as Date[],
    leave: [] as Date[],
    leaves: [] as object[],
    event: [] as Date[],
    allEvents: [] as object[],
    descriptionEvent: "" as string,
  }),
  methods: {
    gotoSickleaves() {
      localStorage.removeItem("ListUsersOnleave");
      this.$router.push(`/Vrequest?id=${this.lineId}&status=1&type=Sickleave`);
    },
    gotoOnleaves() {
      localStorage.removeItem("ListUsersOnleave");
      this.$router.push(`/Vrequest?id=${this.lineId}&status=1&type=Onleave`);
    },
    goTopage() {
      this.$router.push(`/Listleaves?id=${this.lineId}&status=1`);
    },
  },

  created() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.lineId = `${urlParams.get("id")}`;
    this.status = `${urlParams.get("status")}`;

    axios
      .post(`${this.apiconfig}/api/getrequest`, { UserlineId: this.lineId })
      .then((response) => {
        if (response.data.responseCode === 200) {
          this.onLeaveUse =
            this.onLeaveAllday - response.data.responseBody.Onleave;
          this.remainOnLeave = response.data.responseBody.Onleave;
          this.sickLeaveUse =
            this.sickLeaveAllday - response.data.responseBody.Sickleave;
          this.remainSickLeave = response.data.responseBody.Sickleave;
        } else {
          this.onLeaveUse = 0;
          this.remainOnLeave = 3;
          this.sickLeaveUse = 0;
          this.remainSickLeave = 5;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
  mounted() {
    this.calHeigth = window.innerHeight;
    this.calWidth = window.innerWidth;

    axios
      .post(`${this.apiconfig}/api/getEvents`)
      .then((response) => {
        const result = response.data.responseBody;

        const allLeaves: object[] = [];
        const allEvents: object[] = [
          {
            highlight: {
              color: "blue",
              fillMode: "light",
            },
            dates: new Date(),
          },
        ];
        result.map(
          (event: any, i: number, dateTimeStart: Date, dateTimeEnd: Date) => {
            dateTimeStart = new Date(event.start.dateTime || event.start.date);
            dateTimeEnd = new Date(event.end.dateTime || event.end.date);
            const timeStart = Date.parse(`${dateTimeStart}`);
            const timeEnd = Date.parse(`${dateTimeEnd}`);
            const resultTime = timeEnd - timeStart;
            if (event.colorId === "5") {
              if (resultTime > 86400000) {
                allEvents.push({
                  highlight: {
                    start: { color: "yellow", fillMode: "outline" },
                    base: {
                      color: "yellow",
                      fillMode: "light",
                    },
                    end: { color: "yellow", fillMode: "outline" },
                  },
                  dates: { start: dateTimeStart, end: dateTimeEnd },
                  popover: {
                    label: `${event.summary} `,
                    visibility: "focus",
                  },
                });
              } else {
                allEvents.push({
                  dates: dateTimeStart,
                  dot: {
                    color: "yellow",
                  },
                  popover: {
                    label: `${event.summary} `,
                    visibility: "focus",
                  },
                });
              }
            } else if (event.colorId === "11") {
              if (resultTime > 86400000) {
                allEvents.push({
                  highlight: {
                    start: { color: "red", fillMode: "outline" },
                    base: {
                      color: "red",
                      fillMode: "light",
                    },
                    end: { color: "red", fillMode: "outline" },
                  },
                  dates: { start: dateTimeStart, end: dateTimeEnd },
                  popover: {
                    label: `${event.summary} `,
                    visibility: "focus",
                  },
                });
              } else {
                allEvents.push({
                  dates: dateTimeStart,
                  dot: {
                    color: "red",
                  },
                  popover: {
                    label: `${event.summary} `,
                    visibility: "focus",
                  },
                });
              }
            } else {
              allEvents.push({
                dates: dateTimeStart,
                dot: {
                  color: "blue",
                },
                popover: {
                  label:`${event.summary} `,
                  visibility: "focus",
                },
              });
            }
            this.descriptionEvent = `${event.summary} `;
          }
        );
        this.leaves = allLeaves;
        this.allEvents = allEvents;
      })
      .catch((err) => {
        console.error(err);
      });
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
  text-align: center;
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
.vc-container,
.vc-container * {
  box-sizing: border-box;
  border: none;
  border-radius: 0px;
}
.ant-message span {
  font-family: Anuphan !important;
}
</style>
