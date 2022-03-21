<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// defineComponent这个函数没什么用，传入我们的组件对象，返回的还是原对象
// 只不过做了类型推导和类型约束，方便我们ts的开发

export default defineComponent({
  name: "App",
  setup() {
    return {

    };
  },
});
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
