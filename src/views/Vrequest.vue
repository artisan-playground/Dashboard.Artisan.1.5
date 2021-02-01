<template>
  <div class="Vrequest" style="font-family: Anuphan;">
    <div id="components-layout-demo-basic">
      <a-layout>
        <a-layout-header
          ><a-row>
            <span
              class="btu-Clone"
              style="font-family: Anuphan;"
              @click="$router.go(-1)"
            >
              X
            </span>
            <span>Leave form</span>
          </a-row></a-layout-header
        >
      </a-layout>
    </div>
    <a-tabs default-active-key="Onleave" v-if="typeLeave === 'Onleave'">
      <a-tab-pane key="Onleave" tab="ลากิจ">
        <Onleaveform />
      </a-tab-pane>
      <a-tab-pane key="Sickleave" tab="ลาป่วย">
        <Sickleaveform />
      </a-tab-pane>
    </a-tabs>

    <a-tabs
      default-active-key="Sickleave"
      v-else-if="typeLeave === 'Sickleave'"
    >
      <a-tab-pane key="Onleave" tab="ลากิจ">
        <Onleaveform />
      </a-tab-pane>
      <a-tab-pane key="Sickleave" tab="ลาป่วย">
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
@import "../assets/styles/Titlebar.css";

.Vonleave {
  display: flex;
  flex-direction: column;
}
</style>
