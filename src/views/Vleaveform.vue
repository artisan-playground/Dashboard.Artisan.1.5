<template>
  <div class="Vleaveform">
    <div id="components-layout-demo-basic">
      <a-layout>
        <a-layout-header
          ><a-row>
            <span class="btu-Clone" style="font-family: Anuphan;">
              X
            </span>
            <span>Leave form</span>
          </a-row></a-layout-header
        >
      </a-layout>
    </div>
    <Leaveform />
  </div>
</template>
<script lang="ts">
import Leaveform from "../components/Leaveform.vue";

export default {
  name: "Vleaveform",
  components: {
    Leaveform,
  },
};
</script>

<style scoped>
@import "../assets/styles/Titlebar.css";
</style>
