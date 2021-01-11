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
    padding: 20px;
    justify-content: space-evenly;"
    >
      <div class="div-Sickleave">
        <a-button class="btu-Sickleave">
          <p
            class="topicLeave"
            :style="
              `${calWidth > 650 ? `font-size: 18px` : `font-size: 15px`};`
            "
          >
            ลาป่วย
          </p>
          <div
            :style="
              `${calWidth > 650 ? `font-size: 15px` : `font-size: 13px`};`
            "
          >
            <span class="contentLeave" style="margin-right: 1em;"
              >ใช้ไป ... วัน</span
            >
            <span class="contentLeave">เหลือ ... วัน</span>
          </div>
        </a-button>
      </div>
      <div class="div-Onleave">
        <a-button class="btu-Onleave">
          <p
            class="topicLeave"
            :style="
              `${calWidth > 650 ? `font-size: 18px` : `font-size: 15px`};`
            "
          >
            ลากิจ
          </p>
          <div
            :style="
              `${calWidth > 650 ? `font-size: 15px` : `font-size: 13px`};`
            "
          >
            <span class="contentLeave" style="margin-right: 1em;"
              >ใช้ไป ... วัน</span
            >
            <span class="contentLeave">เหลือ ... วัน</span>
          </div>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Leaveform",
  data: () => ({
    calHeigth: 0 as number,
    calWidth: 0 as number,
  }),

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
.cld {
  background: #ffffff;
  box-shadow: 0px 1px 0px #f2f2f2, inset 0px 1px 0px #f2f2f2,
    inset -1px 0px 0px #f2f2f2, inset 1px 0px 0px #f2f2f2;
}
.calendar {
  padding: 20px;
  background: #e9f0ff;
}
.div-Sickleave {
  border-radius: 5px;
  height: 40%;
  width: 100%;
  background-image: url("../assets/bg-Sickleave.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
    0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 21px 8px rgba(0, 0, 0, 0.05);
}
.div-Onleave {
  border-radius: 5px;
  height: 40%;
  width: 100%;
  background-image: url("../assets/bg-Onleave.png");
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
