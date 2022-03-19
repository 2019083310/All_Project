<template>
  <div class="user-info">
    <el-dropdown>
      <span class='el-dropdown-link'>
        <el-avatar
          size="small"
          src="https://img2.baidu.com/it/u=1933820729,3459437998&fm=26&fmt=auto"
        />
        <span > {{ name }} </span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><circle-close-filled /></el-icon>
            退出系统
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><user-filled /></el-icon>
            个人信息
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><promotion /></el-icon>
            修改密码</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "../../../store";

export default defineComponent({
  setup() {
    const store = useStore();

    const name = computed(() => store.state.loginModule.userInfo.name);
    return {
      name,
    };
  },
});
</script>

<style scoped lang='less'>
.el-dropdown-link{
  display: flex;
  align-items: center;
  cursor: pointer;
  span{
    margin-left:5px;
  }
}
</style>
