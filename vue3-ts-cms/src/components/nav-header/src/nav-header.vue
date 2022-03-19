<template>
  <div class="nav-header">
    <el-icon v-if="isCollapse"><expand @click="toggleIcon" /></el-icon>
    <el-icon v-else><fold @click="toggleIcon" /></el-icon>
    <div class="content">
      <el-breadcrumb separator="/">
        <template v-for="item in breadcrumbs" :key="item.name">
          <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import UserInfo from "./userInfo.vue";

import { useStore } from "../../../store";
import { useRoute } from "vue-router";
import { pathToBreadCrumb } from "../../../utils/mapRouter";

export default defineComponent({
  emits: ["collapseChange"],
  components: {
    UserInfo
  },
  setup(props, { emit }) {
    // 控制侧边栏的折叠
    const isCollapse = ref(false);
    const toggleIcon = () => {
      isCollapse.value = !isCollapse.value;
      emit("collapseChange", isCollapse.value);
    };

    // 面包屑的名字获取
    const store = useStore();
    let breadcrumbs = computed(() => {
      const route = useRoute();
      const userMenus = store.state.loginModule.userMenus;
      const currentPath = route.path;
      return pathToBreadCrumb(userMenus, currentPath);
    });

    return {
      isCollapse,
      toggleIcon,
      breadcrumbs,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
.el-icon {
  font-size: 30px;
  cursor: pointer;
}
</style>
