<template>
  <div class="demo" :style="`height:${calHeigth}px !important`">
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
          <button class="button" @click="Signin()">Sign in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import store from "../store";
import axios from "axios";
import { useRoute } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Atslogin",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    calHeigth: 0 as number,
    calWidth: 0 as number,
  }),
  mounted() {
    this.calHeigth = window.innerHeight;
    this.calWidth = window.innerWidth;
  },

  setup(props) {
    const email = ref("");
    const user = computed(() => store.state.user);

    function Signin() {
      axios
        .post(`http://192.168.1.2:8100/api/checkuser`, {
          username: `${email.value}@artisan.co.th`,
          UserlineId: props.id,
        })
        .then(function(response) {
          if (response.data.responseCode === 200) {
            alert("Send to Email Success");
          } else {
            alert("Not found Email");
          }
        })
        .catch(function(error) {
          alert(error);
        });
    }
    return {
      email,
      Signin,
      user,
    };
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
