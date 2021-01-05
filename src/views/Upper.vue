<template>
  <div id="app">
    <h1>{{ upcaseInput }}</h1>
    <input v-model="input" type="text" />
  </div>
</template>
<script>
export default {
  name: "Upper",
  data: () => ({
    input: "กรุณากรอกตัวพิมพ์เล็ก",
  }),
  computed: {
    upcaseInput() {
      return this.input.toUpperCase();
    },
  },
};
</script>
