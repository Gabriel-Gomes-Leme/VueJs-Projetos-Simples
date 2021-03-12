<template>
  <div class="overlay">
  </div>
</template>

<script>
export default {
    name:'Overlay'
}
</script>

<style>
.overlay{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(3,3,3,0.8);
    z-index: 1000;
}
</style>