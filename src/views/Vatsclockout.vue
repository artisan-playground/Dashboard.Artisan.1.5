<template>
  <div class="Vatsclockout">
    <div id="components-layout-demo-basic">
      <a-layout>
        <a-layout-header>
          <a-row>
            <span
              class="btu-Clone"
              style="font-family: Anuphan;"
              @click="$router.go(-1)"
            >
              X
            </span>
            <span>Daily Clock out</span>
          </a-row>
        </a-layout-header>
      </a-layout>
    </div>
    <Atsclockout />
  </div>
</template>
<script lang="ts">
import Atsclockout from "../components/Atsclockout.vue";

export default {
  name: "Vatsclockout",
  components: {
    Atsclockout,
  },
};
</script>
<style scoped>
@import "../assets/styles/Titlebar.css";
</style>
