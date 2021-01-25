<template>
  <div
    class="Vatsclockout"
    id="v-model-textarea"
    :style="`height:${calHeigth}px !important`"
  >
    <h1>Daily Clock out</h1>

    <p class="head">เวลานอนชอบละเมอ แต่เวลาเจอเธอชอบละลาย</p>
    <div class="atsco">
      <p class="daily"><span color="red">* </span>วันนี้ทำอะไรบ้าง</p>
      <textarea
        class="box"
        name="today"
        v-model="today"
        placeholder="วันนี้ทำอะไรบ้าง"
      ></textarea>
    </div>
    <div class="atsco">
      <p class="daily"><span color="red">* </span>พรุ่งนี้ทำอะไรต่อ</p>
      <textarea
        class="box"
        name="tomorrow"
        v-model="tomorrow"
        placeholder="พรุ่งนี้ทำอะไรต่อ"
      ></textarea>
    </div>
    <div class="atsco">
      <p class="daily"><span color="red">* </span>ติดปัญหาอะไร</p>
      <textarea
        class="box"
        name="problem"
        v-model="problem"
        placeholder="ติดปัญหาอะไร"
      ></textarea>
    </div>
    <div class="atsco">
      <p class="daily">Projects ที่ทำ</p>
      <input
        class="box"
        name="project"
        v-model="project"
        placeholder="ชื่อ Project"
      />
    </div>
    <div class="atsco">
      <p class="daily">Tasks ที่ทำในวันนี้</p>
      <input
        class="box"
        name="tasks"
        v-model="tasks"
        placeholder="ชื่อ Tasks "
      />
    </div>
    <button
      class="round-button"
      @click="clockout"
      :disabled="today === '' || tomorrow === '' || problem === ''"
    >
      Daily ออกงาน
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import axios from "axios";
import apiConfig from "../config/api";
export default defineComponent({
  name: "Atsclockout",
  data: () => ({
    apiconfig: apiConfig.API_BASE_ENDPOINT,
    today: "" as string,
    tomorrow: "" as string,
    problem: "" as string,
    project: "" as string,
    tasks: "" as string,
  }),
  methods: {
    clockout() {
      const quetyString = window.location.search;
      const idLine = new URLSearchParams(quetyString);
      const result = {
        lineId: idLine.get("id"),
        Today: this.today,
        Tomorrow: this.tomorrow,
        Issue: this.problem,
        Projects: this.project,
        Tasks: this.tasks,
        clockout: "clockout",
      };

      axios
        .post(`${this.apiconfig}/api/clockout`, result)
        .then((response) => {
          if (response.data.responseCode === 200) {
            alert("สำเร็จแล้ว");
            axios.post(`${this.apiconfig}/api/sendmassage`, {
              id: idLine.get("id"),
              clockout: "Success",
            });
          } else {
            alert("บ่าสำเร็จเด้อ");
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
});
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.Vatsclockout {
  text-align: center;
  background: #ffffff;
  background-image: url(../assets/time.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
}
.head {
  /* Title/Regular */
  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 10vh;
  text-align: center;
  color: #333333;
}

.atsco {
  flex-direction: column;
  padding: 3px;
  position: static;
}

textarea.box {
  height: 15vh;
  width: 95%;
  border-radius: 2px;
}

textarea::placeholder {
  text-indent: 0.5em;
  font-size: 14px;
  font-family: Anuphan;
}

input.box {
  height: 32px;
  width: 95%;
}

input::placeholder {
  text-indent: 0.5em;
  font-size: 14px;
  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
}

p.daily {
  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 35px;
  text-align: justify;
  text-indent: 0.6em;
}

.round-button {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 1px solid #0036c7;
  cursor: pointer;
  font-size: 26px;
  font-family: Anuphan;
  background-color: #0036c7;
  color: #e2eaf3;
  margin: 50px;
  box-shadow: 0 0 20px gray;
}

.round-button:disabled {
  background-color: rgb(165, 165, 165);
  border: 1px solid rgb(165, 165, 165);
}

.round-button:active {
  background-color: #315ac9;
  box-shadow: 0 5px rgb(165, 165, 165);
  transform: translateY(2px);
}

span {
  color: red;
}
</style>
