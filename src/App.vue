<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <HelloWorld/> -->
    <Lava/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Lava from './components/lava'

export default {
  name: 'app',
  components: {
    Lava
  }
}
</script>

<style src="./style/layout.css"></style>
<style src="./style/color.css"></style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50;
  margin-top: 60px; */
}
</style>
