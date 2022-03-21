<template>
  <div class="ly-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <!-- el-row el-col用来做栅格布局，响应式布局 -->
      <el-row>
        <template v-for="item in formItems" :keys="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :rules="item.rules" :style="itemStyle">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                  <el-date-picker
                    v-bind="item.otherOptions"
                    style="width: 100%"
                    v-model="formData[`${item.field}`]"
                  ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import type { IFormItem } from "../types";

export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    itemStyle: {
      type: Object,
      default: () => {
        return { padding: "10px 40px" };
      },
    },
    colLayout: {
      type: Object,
      default: () => {
        return {
          xl: 6,
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24,
        };
      },
    },
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    //实现对组件的双向数据绑定
    // 方法1：直接对父组件传过来的moduleValue操作，违背单向数据流
    // 方法2：computed()但是这样也相当于对moduleValue直接操作
    // 方法3：如下，用ref对moduleValue做一个浅拷贝，不影响父组件
    // console.log(props.modelValue)
    const formData = ref({ ...props.modelValue });

    watch(
      formData,
      (newValue) => {
        // console.log(newValue)
        emit("update:modelValue", newValue);
      },
      {
        deep: true,
      }
    );
    return {
      formData
    };
  },
});
</script>

<style scoped lang="less">
.ly-form {
  padding-top: 22px;
  background-color: #fff;
}
</style>
