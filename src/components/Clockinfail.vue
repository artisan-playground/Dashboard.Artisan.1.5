<template>
  <div class="Vclockinfail">
    <img id="checkinf" alt="checkinf" src="../assets/clockinfail.png" />

    <div>
      <p class="alert">นั่นแน่ จะลักไก่เหรอ!!!!! เราเห็นน้า</p>
    </div>

    <div>
      <button class="conbutton">Continue</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Clockinfail",
};
</script>

<style scoped>
.Vclockinfail {
  position: relative;
  height: 812px;
  width: 375px;

  background: #ffffff;
}
.alert {
  width: 350px;
  height: 36px;

  font-family: Anuphan;
  font-size: 16px;
  line-height: 25px;

  text-align: center;

  color: #4f4f4f;
}
.conbutton {
  background-color: white;
  color: #105efb;
  width: 25%;
  height: 40px;
  border: 1px solid #0036c7;
  box-sizing: border-box;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
  border-radius: 2px;
  cursor: pointer;

  font-family: Anuphan;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
}
</style>
