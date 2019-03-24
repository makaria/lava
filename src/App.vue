<template>
  <div id="app">
    <Lava/>
  </div>
</template>

<script>
import Lava from "./components/lava";

export default {
  name: "app",
  components: {
    Lava
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body {
  margin: 0;
}
</style>
