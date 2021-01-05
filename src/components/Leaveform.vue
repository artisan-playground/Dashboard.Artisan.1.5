<template>
  <div class="Vleaveform">
    <div class="box">
      <div
        class="cld"
        :style="{width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px'}"
      >
        <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
      </div>
    </div>
    <router-link to="Vonleave">
      <div class="box">
        <button class="button1" @click="Sick()">ลาป่วย</button>
      </div>
    </router-link>
    <router-link to="Vonleave">
      <div class="box">
        <button class="button2" @click="Stop()">ลากิจ</button>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  methods: {
    onPanelChange(value, mode) {
      console.log(value, mode);
    },
  },
  name: "Leaveform",
};
</script>

<style scoped>
.Vleaveform {
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
.button1 {
  position: absolute;
  width: 343px;
  height: 96px;
  left: 16px;
  top: 375px;
  background-image: url("../assets/Group.png");
  background: #ffffff;
  border: none;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px rgba(0, 0, 0, 0.08),
    0px 3px 6px -4px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
.button2 {
  position: absolute;
  width: 343px;
  height: 96px;
  left: 16px;
  top: 510px;
  background-image: url("../assets/Groupp.png");
  background: #ffffff;

  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08),
    0px 9px 21px 8px rgba(0, 0, 0, 0.05);
  border: none;
}
.cld {
  margin-left: 26px;
  background: #ffffff;
  box-shadow: 0px 1px 0px #f2f2f2, inset 0px 1px 0px #f2f2f2, inset -1px 0px 0px #f2f2f2,
    inset 1px 0px 0px #f2f2f2;
}
</style>
