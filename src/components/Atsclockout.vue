<template>
  <div class="Vatsclockin" id="v-model-textarea">
    <h1>Daily Clock out</h1>
    <form layout="inline" :model="formInline" @submit="handleSubmit" @submit.enter.prevent>
      <div class="atsco">
        <p class="daily">
          <font color="red">* </font>วันนี้ทำอะไรบ้าง
        </p>
        <textarea class="box" name="today" v-model="formInline.today" placeholder="วันนี้ทำอะไรบ้าง"></textarea>
      </div>
      <div class="atsco">
        <p class="daily">
          <font color="red">* </font>พรุ่งนี้ทำอะไรต่อ
        </p>
        <textarea class="box" name="tomorrow" v-model="formInline.tomorrow" placeholder="พรุ่งนี้ทำอะไรต่อ"></textarea>
      </div>
      <div class="atsco">
        <p class="daily">
          <font color="red">* </font>ติดปัญหาอะไร
        </p>
        <textarea class="box" name="problem" v-model="formInline.problem" placeholder="ติดปัญหาอะไร"></textarea>
      </div>
      <div class="atsco">
        <p class="daily">Projects ที่ทำ</p>
        <input class="box" name="project" v-model="project" placeholder="ชื่อ Project" />
      </div>
      <div class="atsco">
        <p class="daily">Tasks ที่ทำในวันนี้</p>
        <input class="box" name="tasks" v-model="tasks" placeholder="ชื่อ Tasks " />
      </div>
      <button class="round-button" @click="clockout()"
        :disabled="formInline.today === '' || formInline.tomorrow === '' || formInline.problem === ''">
        <!-- {{formInline.today === '' || formInline.tomorrow === '' || formInline.problem === ''}} -->
        Daily ออกงาน
      </button>
    </form>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent
  } from "vue";
  import {
    computed,
    ref
  } from "vue";
  import store from "../store";
  import axios from "axios";
  import {
    useRoute
  } from "vue-router";
  export default {
    name: "Atsclockout",
    setup() {
      const today = ref("");
      const tomorrow = ref("");
      const problem = ref("");
      const project = ref("");
      const tasks = ref("");

      function clockout() {
        const quetyString = window.location.search;
        const idLine = new URLSearchParams(quetyString);
        axios
          .post(`http://192.168.1.18:8100/api/clockout`, {
            lineId: idLine.get("id"),
            Today: today.value,
            Tomorrow: tomorrow.value,
            Issue: problem.value,
            Projects: project.value,
            Tasks: tasks.value,
          })
          .then(function (response) {
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
    },
    methods: {
      handleSubmit(e: object) {
        console.log(e);
      },
    },
    data() {
      return {
        formInline: {
          today: '',
          tomorrow: '',
          problem: '',
          project: '',
          tasks: '',
          clockout: '',
        },
      };
    }
  };
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media screen and (max-width: 430px) {
    body {
      width: 100%;
    }
  }

  .Vatsclockin {
    position: relative;
    /* width: 375px;
      height: 812px; */
    background: #ffffff;
    background-image: url(../assets/time.png);
    background-repeat: no-repeat;
    background-position: bottom;
  }

  .atsco {
    flex-direction: column;
    padding: 3px;
    position: static;
  }

  textarea.box {
    height: 15vh;
    width: 50vh;
    border-radius: 5px;
  }

  textarea::placeholder {
    text-indent: 0.5em;
    font-size: 14px;
    font-family: Anuphan;
  }

  input.box {
    height: 32px;
    width: 50vh;
    top: 30px;
    padding: 1px, 2px, 1px, 2px;
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
    box-shadow: 0 5px rgb(136, 135, 135);
    transform: translateY(2px);
  }
</style>