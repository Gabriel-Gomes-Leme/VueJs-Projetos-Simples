<template>
  <div id="app">
    <Header />
    <Conversor />
  </div>
</template>

<script>
import Header from "./components/Header";
import Conversor from "./components/Conversor";
export default {
  name: "App",
  components: {
    Header,
    Conversor,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
