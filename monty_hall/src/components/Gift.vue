<template>
  <div class="gift">
      <div class="laco1"></div>
      <div class="laco2"></div>
      <div class="gift-top"></div>
      <div class="gift-body"></div>
  </div>
</template>

<script>
export default {
    name:'gift'
}
</script>

<style>
    .gift{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 10;
    }
    .gift-top{
        width: 100px;
        height: 25px;
        background-color: rgb(69, 141, 69);
    }
    .gift-body{
        width: 90px;
        height: 60px;
        background-color: rgb(41, 109, 41);
        box-shadow: 1px 2px 2px black;
    }
    .laco1{
        position: absolute;
        top: 0;
        height: 100%;
        width: 20%;
        background-color: crimson;
        box-shadow: 1px 2px 2px black;
    }
    .laco2{
        position: absolute;
        top: 40px;
        height: 20%;
        width: 90%;
        background-color: crimson;
        box-shadow: 1px 2px 2px black;
    }
</style>