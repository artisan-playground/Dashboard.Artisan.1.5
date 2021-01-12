<template>
  <div class="demo" :style="`height:${calHeigth}px !important`">
    <a-modal :visible="visible" @cancel="handleCancel" footer="">
      <div
        v-if="massageCode === 0"
        style="text-align: center;font-family: Anuphan;font-size: large;
    font-weight: bold;padding: 0px 25px;"
      >
        <div>
          <img
            src="https://img.icons8.com/emoji/48/000000/warning-emoji.png"
            style="width:10%;float: left;"
          />กรุณากรอก E-mail ด้วยจ้า
        </div>
        <div style="text-align: end;margin-top: 2em;">
          <a-button type="primary" class="btu-modal" @click="handleCancel">
            OK
          </a-button>
        </div>
      </div>
      <div
        v-if="massageCode === 1"
        style="text-align: center;font-family: Anuphan;font-size: large;
    font-weight: bold; "
      >
        <div style="margin-top:1em; padding: 0px 20px;">
          <img
            src="https://img.icons8.com/cotton/64/000000/checkmark.png"
            style="width:10%;float: left;"
          />ลงทะเบียนเรียบร้อยแล้วจ้า
        </div>

        <div style="text-align: end;margin-top: 2em;">
          <a-button type="primary" class="btu-modal" @click="signinSuccess">
            OK
          </a-button>
        </div>
      </div>
      <div
        v-if="massageCode === 2"
        style="text-align: center;font-family: Anuphan;font-size: large;
    font-weight: bold;"
      >
        <div style="margin-top:1em">
          <img
            src="https://img.icons8.com/cotton/64/000000/delete-sign--v2.png"
            style="width:10%;float: left;"
          />ไม่พบ E-mail ที่กรอกมากรุณาติดต่อ HR
        </div>

        <div style="text-align: end;margin-top: 2em;">
          <a-button type="primary" class="btu-modal" @click="handleCancel">
            OK
          </a-button>
        </div>
      </div>
    </a-modal>
    <div
      class="flex"
      :style="
        `${
          calWidth > 750
            ? `padding: 75px;height: 70vh;text-align: center;`
            : `text-align: center;`
        }`
      "
    >
      <div>
        <div>
          <img id="logoArttisan" alt="Artisan" src="../assets/logologin.png" />
        </div>
        <div>
          <p
            id="titelProject"
            :style="
              `${calWidth > 760 ? `font-size: 24px` : `font-size: 18px`};`
            "
          >
            Artisan Dashboard
          </p>
        </div>

        <div class="flex-col" style="margin-top:3em">
          <input
            id="em"
            v-model="email"
            placeholder="E-mail"
            autocomplete="off"
          />
          <label
            id="ats"
            :style="
              `${calWidth > 400 ? `font-size: 13px` : `font-size: 11px`};`
            "
            >@artisan.co.th</label
          >
        </div>
        <div class="flex-col" style="margin-top:2em">
          <button class="button" @click="signIn">Sign in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { defineComponent } from "vue";
import apiConfig from "../config/api";

export default defineComponent({
  name: "Atslogin",
  data: () => ({
    calHeigth: 0 as number,
    calWidth: 0 as number,
    email: "" as string,
    visible: false as boolean,
    massageCode: 0 as number,
    resultSignin: {},
    date: "",
    apiconfig: apiConfig.API_BASE_ENDPOINT,
  }),

  methods: {
    signIn: function() {
      const quetyString = window.location.search;
      const params = new URLSearchParams(quetyString);

      if (!this.email) {
        this.notify();
      } else {
        return axios
          .post(`${this.apiconfig}/api/checkuser`, {
            username: `${this.email}@artisan.co.th`,
            UserlineId: params.get("id"),
          })
          .then((response) => {
            if (response.data.responseCode === 200) {
              this.massageCode = 1;
            } else {
              this.massageCode = 2;
            }
            this.notify();
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    signinSuccess() {
      location.href = "https://line.me/R/ti/p/%40886oreka";
    },
    handleCancel(e: object) {
      this.visible = false;
    },
    notify() {
      this.visible = true;
    },
    handleOk(e: object) {
      console.log(e);
      this.visible = false;
    },
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
.demo {
  background-image: url(../assets/piclogin.png);
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100%;
}
.flex {
  height: 75vh;
  justify-content: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.flex-col {
  display: flex;
  justify-content: center;
  font-family: Anuphan;
}
.button {
  font-family: Anuphan;
  width: 100%;
  height: 37px;
  border-radius: 2px;
  background-color: #134f83;
  color: rgb(255, 255, 255);
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
  border: 2px solid #d3ecfd;
  border-radius: 2px;
  page-break-after: 16px;
}
#logoArttisan {
  width: 80%;
}
#titelProject {
  font-family: Anuphan, sans-serif;
  font-size: 18px;
  margin-top: 1em;
  margin-bottom: 0px;
  color: #134f83;
}

#em {
  width: 70%;
  top: calc(50% - 30px / 2);
  font-family: Anuphan;
  line-height: 30px;
  display: flex;
  flex: none;
  order: 1;
  flex-grow: 0;
  background-image: url("../assets/emaillogin.png");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 7px 6px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 2px;
  padding-left: 33px;
  border: 1px solid #d9d9d9;
}

#ats {
  width: 30%;
  padding: 0 2%;
  top: calc(50% - 30px / 2);
  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 30px;
  color: #4f4f4f, 100%;
  flex: none;
  order: 1;
  flex-grow: 0;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 2px;
  background: #f5f5f5;
}
</style>
