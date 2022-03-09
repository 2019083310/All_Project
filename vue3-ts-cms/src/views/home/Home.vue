<template>
  <div>
    <h2>首页</h2>
    <h2>{{ $store.state.counter }}</h2>

    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-result
        icon="warning"
        title="Warning Tip"
        sub-title="Please follow the instructions"
      >
    </el-result>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
