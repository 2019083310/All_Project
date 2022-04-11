<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- bug：每一个详情的数据没有更新，因为keep-alive缓存了 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from './components/content/maintabbar/MainTabBar.vue'
export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style scoped>
  @import url('./assets/css/base.css');
</style>
