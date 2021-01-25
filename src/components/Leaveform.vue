<template>
  <div class="Vleaveform">
    <div class="calendar">
      <div class="cld">
        <v-calendar
          is-expanded
          :columns="$screens({ lg: 2 }, 1)"
          :min-date="new Date()"
          :attributes="attributes"
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
              <span class="contentLeave">เหลือ {{ remainSickLeave }} วัน</span>
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
              <span class="contentLeave">เหลือ {{ remainOnLeave }} วัน</span>
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
    remainSickLeave: 0 as number,
    remainOnLeave: 0 as number,
    descriptionLeave: "" as string,
    holiday: [] as Date[],
    leave: [] as Date[],
    leaves: [] as any[],
    event: [] as Date[],
    descriptionEvent: "" as string,
  }),
  computed: {
    attributes(): any {
      return [
        {
          highlight: {
            color: "blue",
            fillMode: "light",
          },
          dates: new Date(),
        },
        {
          dot: {
            color: "red",
            fillMode: "light",
          },
          dates: this.holiday,
          popover: {
            label: "Holiday",
            visibility: "focus",
          },
        },
        {
          dates: this.event,
          dot: {
            color: "blue",
            class: "opacity-75",
          },
          popover: {
            label: this.descriptionEvent,
            visibility: "focus",
          },
        },
        {
          dates: this.leave,
          dot: {
            color: "yellow",
          },
          popover: {
            label: "Leave",
            visibility: "focus",
          },
        },
        {
          highlight: {
            start: { color: "yellow", fillMode: "outline" },
            base: {
              color: "yellow",
              fillMode: "light",
            },
            end: { color: "yellow", fillMode: "outline" },
          },
          dates: this.leaves,
          popover: {
            label: "Leave",
            visibility: "focus",
          },
        },
      ];
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
    axios
      .post(`${this.apiconfig}/api/getEvents`)
      .then((response) => {
        const result = response.data.responseBody;
        const allEvent: Date[] = [];
        const allHoliday: Date[] = [];
        const allLeave: Date[] = [];
        const allLeaves: object[] = [];
        result.map(
          (event: any, i: number, dateTimeStart: Date, dateTimeEnd: Date) => {
            dateTimeStart = new Date(event.start.dateTime);
            dateTimeEnd = new Date(event.end.dateTime);
            if (event.colorId === "5") {
              const timeStart = Date.parse(`${dateTimeStart}`);
              const timeEnd = Date.parse(`${dateTimeEnd}`);
              const resultTime = timeEnd - timeStart;
              if (resultTime > 86400000) {
                allLeaves.push({ start: dateTimeStart, end: dateTimeEnd });
              } else {
                allLeave.push(dateTimeStart);
              }
            } else if (event.colorId === "11") {
              allHoliday.push(dateTimeStart);
            } else {
              allEvent.push(dateTimeStart);
            }
            this.descriptionEvent = `${event.summary}`;
          }
        );
        this.leaves = allLeaves;
        this.holiday = allHoliday;
        this.leave = allLeave;
        this.event = allEvent;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  mounted() {
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
.vc-container,
.vc-container * {
  box-sizing: border-box;
  border: none;
  border-radius: 0px;
}
</style>
