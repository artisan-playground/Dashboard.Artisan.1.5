<template>
  <div>
    <div id="components-layout-demo-basic">
      <a-layout>
        <a-layout-header>
          <span
            class="btu-Clone"
            style="font-family: Anuphan;"
            @click="$router.go(-1)"
          >
            X
          </span>
          <span>Clock in</span>
        </a-layout-header>
      </a-layout>
    </div>
    <Googlemap />
  </div>
</template>

<script lang="ts">
import Googlemap from "../components/Googlemap.vue";

export default {
  name: "Clockin",
  components: {
    Googlemap,
  },
};
</script>
<style scoped>
@import "../assets/styles/Titlebar.css";
</style>
