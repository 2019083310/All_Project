<template>
  <div class="ly-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60px"
      >
      </el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        align="center"
        label="序号"
        width="80px"
      >
      </el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          layout="total, sizes,prev, pager, next,jumper"
          :total="listCount"
          :page-sizes="[10, 20, 30]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true,
    },
    listCount: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    propList: {
      type: Array,
      required: true,
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    childrenProps: {
      type: Object,
      default: () => {},
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 }),
    },
  },
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit("selectionChange", value);
    };

    // 分页功能
    const handleSizeChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage });
    };

    const handleCurrentChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
    };

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped lang="less">
.ly-table {
  margin: 10px;
}
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-self: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
    margin-left: 1050px;
  }
}

.footer {
  margin-top: 15px;
  // display: flex;
  .el-pagination {
    text-align: center;
    margin-left:800px;

  }
}
</style>
