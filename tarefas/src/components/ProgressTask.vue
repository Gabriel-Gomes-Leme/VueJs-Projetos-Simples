<template>
  <div class="progress-bar">
    <span class="progress-value">{{progress}}%</span>
    <div class="progress" :style="{width: progress + '%'}"></div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
.progress-bar {
  position: relative;
  width: 50%;
  height: 40px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.progress {
  position: absolute;
  height: 100%;
  background-color: seagreen;
  align-self: flex-start;
}
.progress-value {
  z-index: 1;
}
</style>