<template>
  <div class="demo">
    <img id="pic" alt="Artisan" src="../assets/logologin.png" />
    <h1>Artisan Dashboard</h1>
    <div class="flex">
      <div class="flex-col">
        <input id="em" v-model="email" placeholder="E-mail" />
        <label id="ats">@artisan.co.th</label>
      </div>
      <div class="flex-col">
        <button class="button" @click="Signin()">Sign in</button>
      </div>
      <div></div>
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
  setup(props) {
    const email = ref("");
    const user = computed(() => store.state.user);

    function Signin() {
      console.log(props.id);

      axios
        .post(`http://192.168.1.18:8100/api/checkuser`, {
          username: email.value,
          UserlineId: props.id,
        })
        .then(function(response) {
          console.log(email.value);
          if (response.data.responseCode === 200) {
            alert("Send to Email Success");
          } else {
            alert("Not found Email");
          }
        })
        .catch(function(error) {
          alert(error);
        });

      store.state.user = { email: email.value };
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
.demo {
  text-align: center;
  height: 100vh;
  background-image: url(../assets/piclogin.png);
  background-repeat: no-repeat;
  background-position: bottom;
  background-attachment: fixed;
}
.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.flex-col {
  width: 100%;
  margin-bottom: 16px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 5px;
  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
}
.button {
  font-family: Anuphan;
  width: 500px;
  height: 37px;
  border-radius: 2px;
  background-color: #134f83;
  color: rgb(255, 255, 255);
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
  border: 2px solid #d3ecfd;
  border-radius: 2px;
  margin-left: 16px;
  margin-right: 16px;
}
h1 {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  margin-bottom: 20px;
  color: #134f83;
}
#em {
  position: static;
  width: 200px;
  height: 31px;
  left: 32px;
  top: calc(50% - 30px / 2);
  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 30px;
  display: flex;
  align-items: center;
  /* color: rgba(0, 0, 0, 0.25); */
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px -8px;
  background-image: url("../assets/emaillogin.png");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 7px 4px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 2px;
  padding-left: 33px;
}
#pic {
  text-align: center;
  margin-top: 90px;
  margin-bottom: 10px;
  margin-left: 50px;
  margin-right: 50px;
}
#ats {
  position: static;
  width: 91px;
  height: 30px;
  left: 12px;
  top: calc(50% - 30px / 2);
  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 30px;
  color: #4f4f4f;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px -10px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 2px;
  background: #f5f5f5;
}
#pic1 {
  position: absolute;
  left: 0%;
  right: 8.32%;
  top: 63%;
  bottom: 8.55%;
  max-width: 100%;
}
</style>
