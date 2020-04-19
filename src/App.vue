<template>
  <div id="app">
    <Cupboard/>
  </div>
</template>

<script>

import Cupboard from "@/components/Cupboard.vue";
export default {
  name: 'App',
  components: {
    Cupboard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  height: 100%;
}
html {
  height: 100%;
  background-color: #78B89E;
}
body {
  height: 100%;
}
</style>
