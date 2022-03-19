<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="../../../assets/img/logo.svg" alt="" class="img" />
      <span class="title" v-if="collapse">Vue+TS</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      background-color="#0c2135"
      active-text-color="#0a60bd"
      text-color="#b7bdc3"
      :default-active="defaultValue"
      :collapse="!collapse"
    >
      <!-- 二级菜单 -->
      <template v-for="item in menuList" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if='item.icon==="el-icon-monitor"'><platform /></el-icon>
              <el-icon v-if='item.icon==="el-icon-setting"'><tools /></el-icon>
              <el-icon v-if='item.icon==="el-icon-goods"'><goods-filled /></el-icon>
              <el-icon v-if='item.icon==="el-icon-chat-line-round"'><chat-dot-square /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleClick(subItem)">
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed ,ref} from "vue"
import { useStore } from "vuex"
import { useRouter ,useRoute} from "vue-router"

import type { storeState } from "../../../store/type"

import {pathToMenu} from '../../../utils/mapRouter'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // store
    const store = useStore<storeState>()

    // router
    const router = useRouter()
    const route=useRoute()

    // data
    const menuList = computed(() => store.state.loginModule.userMenus)
    const menu=pathToMenu(menuList.value,route.path)
    const defaultValue=ref(menu.id+'')

    // event handle
    const handleClick = (subItem: any) => {
      router.push({
        path: subItem.url ?? "/notFound",
      });
    }

    return {
      menuList,
      handleClick,
      defaultValue
    };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;

    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu-vertical {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单
    el-menu-item {
      padding-left: 15px;
      background-color: #0c2135 !important;
    }
  }
  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
