<template>
  <div class="page-content">
    <ly-table :listData="dataList" v-bind="contentTableConfig">
      <!-- 1.header找的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="default">新建用户</el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button size="default" plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? "启用" : "禁用" }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filter.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filter.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button type="info" size="small">编辑</el-button>
          <el-button type="primary" size="small">删除</el-button>
        </div>
      </template>
    </ly-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import LyTable from "../../base-ui/table/src/LyTable.vue";

import { useStore } from "../../store";

export default defineComponent({
  components: {
    LyTable,
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // 注：setup内的函数加载的时候只会执行一次
    const store = useStore();

    //2.发起网络请求
    const getPageData = (queryInfo:any={}) => {
      store.dispatch("systemModule/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: 0,
          size: 10,
          ...queryInfo
        },
      });
    };
    getPageData()

    const dataList = computed(() =>
      store.getters[`systemModule/pageListData`](props.pageName)
    );
    return {
      dataList,
      getPageData
    };
  },
});
</script>

<style scoped>
.page-content {
  padding: 3px;
  border-top: 20px solid #f5f5f5;
  background-color: #fff;
}
</style>
