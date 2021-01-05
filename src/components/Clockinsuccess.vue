<template>
  <div class="Vclockinsuccess">
    <img id="clockinpic" alt="clockinpic" src="../assets/clockinsc.png" />

    <h1>Check in</h1>

    <div>
      <p class="text1">
        Success is a lousy teacher. I seduces smart people into thinking they can't lose.
      </p>
      <p class="text2">Bill Gates</p>
    </div>

    <div></div>
  </div>
</template>

<script>
export default {
  name: "Clockinsuccess"
};
</script>

<style scoped>
.Vclockinsuccess {
  position: relative;
  width: 375px;
  height: 812px;

  background: #ffffff;
}
#clockinpic {
  margin-top: 20%;
}
h1 {
  font-family: Anuphan;
  font-size: 30px;
}
.text1 {
  width: 350px;
  height: 36px;

  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #4f4f4f;
}
.text2 {
  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  align-items: center;
  text-align: center;

  color: #4f4f4f91;
}
</style>
