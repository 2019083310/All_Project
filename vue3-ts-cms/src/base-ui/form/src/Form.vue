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
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
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
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
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
    // const formData = ref({ ...props.modelValue });

    // watch监听的是formData里面属性的值得变化,如果值变化，触发emit事件,父组件的update-modelValue事件出发
    // 子组件把newValue=formData,把formData作为newValue赋值给父组件的formData完成双向绑定

    // 现在我们要做的是点击重置按钮后表单双向绑定的值为空
    // 对应父组件的前两种方法
    // watch(
    //   formData,
    //   (newValue) => {
    //     // console.log(newValue)
    //     emit("update:modelValue", newValue);
    //   },
    //   {
    //     deep: true,
    //   }
    // );

    // 对应父组件的第三种方法
    const handleValueChange=(value:any,field:string)=>{
      // console.log(value)
      emit('update:modelValue',{...props.modelValue,[field]:value})
    }

    return {
      // formData,
      handleValueChange
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
