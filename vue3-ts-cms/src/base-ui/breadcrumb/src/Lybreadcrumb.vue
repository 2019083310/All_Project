<template>
  <div class='nav-breadcrumb'>
    <el-breadcrumb separator-icon="/">
      <template v-for='item in breadcrumbs' :key='item.name'>
        <el-breadcrumb-item >{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent,PropType } from "vue";
import {IBreadCrumb} from '../type'

export default defineComponent({
  props:{
    breadcrumbs:{
      type:Array as PropType<IBreadCrumb[]>,
      default:()=>[]
    }
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
