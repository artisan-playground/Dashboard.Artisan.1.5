<template>
  <div class="Vatslogin">
    <Atslogin
      msg="Welcome to Your Vue.js + TypeScript App"
      :id="$route.query.id"
      @login="login"
    />
  </div>
</template>
<script lang="ts">
import Atslogin from "../components/Atslogin.vue";
import axios from "axios";
import store from "../store";
export default {
  name: "Vatslogin",
  components: {
    Atslogin,
  },
  methods: {
    login(loginForm: any) {
      console.log(loginForm);
    },
  },
};
</script>
