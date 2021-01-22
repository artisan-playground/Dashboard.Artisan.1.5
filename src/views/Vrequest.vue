<template>
  <div class="Vrequest" style="font-family: Anuphan;">
    <a-tabs :default-active-key="typeLeave">
      <a-tab-pane key="Onleave" tab="ลากิจ">
        <Onleaveform />
      </a-tab-pane>
      <a-tab-pane key="Sickleave" tab="ลาป่วย" force-render>
        <Sickleaveform />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import Onleaveform from "../components/OnLeave.vue";
import Sickleaveform from "../components/SickLeave.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Vrequest",
  components: { Sickleaveform, Onleaveform },
  data: () => ({
    typeLeave: "" as string,
  }),
  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.typeLeave = `${urlParams.get("type")}`;
  },
});
</script>
<style scoped>
@font-face {
  font-family: Anuphan;
  src: url("../fonts/Anuphan-Regular.woff") format("woff");
}
.Vonleave {
  display: flex;
  flex-direction: column;
}
</style>
