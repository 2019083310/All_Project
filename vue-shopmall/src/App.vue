<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html,
  body,
  #app {
    height: 100%;
    padding: 0;
    margin: 0;
  }
</style>