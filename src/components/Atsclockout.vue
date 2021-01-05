<template>
  <div class="Vatsclockin" id="v-model-textarea">
    <h1>Daily Clock out</h1>

    <div class="atsco">
      <p class="daily"><font color="red">* </font>วันนี้ทำอะไรบ้าง</p>
      <textarea
        class="box"
        name="today"
        v-model="today"
        placeholder="วันนี้ทำอะไรบ้าง"
      ></textarea>
    </div>

    <div class="atsco">
      <p class="daily"><font color="red">* </font>พรุ่งนี้ทำอะไรต่อ</p>
      <textarea
        class="box"
        name="tomorrow"
        v-model="tomorrow"
        placeholder="พรุ่งนี้ทำอะไรต่อ"
      ></textarea>
    </div>

    <div class="atsco">
      <p class="daily"><font color="red">* </font>ติดปัญหาอะไร</p>
      <textarea
        class="box"
        name="problem"
        v-model="problem"
        placeholder="ติดปัญหาอะไร"
      ></textarea>
    </div>

    <div class="atsco">
      <p class="daily">Projects ที่ทำ</p>
      <input class="box" name="project" v-model="project" placeholder="ชื่อ Project" />
    </div>

    <div class="atsco">
      <p class="daily">Tasks ที่ทำในวันนี้</p>
      <input class="box" name="tasks" v-model="tasks" placeholder="ชื่อ Tasks " />
    </div>

    <div class="round-button">
      <div class="round-button-circle">
        <a href="#" class="round-button" @click="clockout()">Daily ออกงาน</a>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {computed, ref} from "vue";
import store from "../store";
import axios from "axios";
import {useRoute} from "vue-router";
export default {
  name: "Atsclockout",
  setup() {
    const today = ref("");
    const tomorrow = ref("");
    const problem = ref("");
    const project = ref("");
    const tasks = ref("");
    function clockout() {
      axios
        .post(`http://172.16.3.33:8100/api/clockout`, {
          Today: today.value,
          Tomorrow: tomorrow.value,
          Issue: problem.value,
          Projects: project.value,
          Tasks: tasks.value,
        })
        .then(function (response) {
          console.log(response.data.responseBody);
          console.log(response.data.responseCode);
          if (response.data.responseCode === 200) {
            alert(response.data.message);
          } else {
            alert("Success");
          }
        })
        .catch(function (error) {
          alert(error);
        });
    }
    return {
      today,
      tomorrow,
      problem,
      project,
      tasks,
      clockout,
    };
  },
};
</script>

<style scoped>
.Vatsclockin {
  position: relative;
  width: 375px;
  height: 944px;

  background-image: url(../assets/clockoutpic.png);
  background-repeat: no-repeat;
  background-position-y: 97%;
}

.atsco {
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
textarea.box {
  height: 98px;
  width: 343px;
  left: 0px;
  top: 0px;
  border-radius: 4px;
  padding: 1px, 2px, 1px, 2px;
  padding-left: 10px;
}
textarea::placeholder {
  text-indent: 0.1em;
  font-size: 14px;
}
input.box {
  height: 35px;
  width: 343px;
  left: 0px;
  top: 30px;
  padding: 1px, 2px, 1px, 2px;
  padding-left: 10px;
}
input::placeholder {
  text-indent: 0.1em;
  font-size: 14px;
}
p.daily {
  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
}
.round-button {
  width: 150px;
  position: absolute;
  left: 25%;
  margin-top: 30px;

  color: #e2eaf3;
  font-family: Anuphan;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
}
.round-button-circle {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: #0036c7;
  box-shadow: 0 0 20px gray;
}
.round-button-circle:hover {
  background: #4876ff;
}
.round-button a {
  display: block;
  float: left;
  left: 0px;
  width: 100%;
  padding-top: 40%;
  padding-bottom: 50%;
  line-height: 1em;
  margin-top: -0.5em;

  text-align: center;
  color: #e2eaf3;
  font-family: Anuphan;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
}
</style>
