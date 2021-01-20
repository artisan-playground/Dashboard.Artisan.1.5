<template>
  <div class="Vrequest" style="font-family: Anuphan;">
    <a-tabs :default-active-key="typeLeave">
      <a-tab-pane key="Onleave" tab="ลากิจ">
        <OnLeaveForm />
      </a-tab-pane>
      <a-tab-pane key="Sickleave" tab="ลาป่วย" force-render>
        <SickLeaveForm />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import SickLeaveForm from "../components/SickLeave.vue";
import OnLeaveForm from "../components/OnLeave.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Vrequest",
  components: { SickLeaveForm, OnLeaveForm },
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
