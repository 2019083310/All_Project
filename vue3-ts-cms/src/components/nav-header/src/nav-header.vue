<template>
  <div>
    <el-icon v-if='isCollapse'><expand @click='toggleIcon'/></el-icon>
    <el-icon v-else><fold @click='toggleIcon'/></el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";

export default defineComponent({
  emits:['collapseChange'],
  setup(props,{emit}) {
    const isCollapse=ref(true)
    const toggleIcon=()=>{
      isCollapse.value=!isCollapse.value
      emit('collapseChange',isCollapse.value)
    }

    return {
      isCollapse,
      toggleIcon
    };
  },
});
</script>

<style scoped lang='less'>
.el-icon{
  font-size:30px;
}
</style>
