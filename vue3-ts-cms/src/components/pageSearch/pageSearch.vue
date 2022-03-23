<template>
  <div>
    <ly-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="handle-btns">
          <el-button type="info" @click='handleResetClick'>重置</el-button>
          <el-button type="primary" @click='handleSearchClick'>搜索</el-button>
        </div>
      </template>
    </ly-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LyForm from "../../base-ui/form/src/Form.vue";

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
  },
  components: {
    LyForm,
  },
  emits:['queryBtnClick','resetBtnClick'],
  setup(props,{emit}) {
    // 优化1：双向绑定的属性应该动态的由外界来决定---searchFormConfig.formItems
    const formItems=props.searchFormConfig?.formItems??[]
    const formOriginData:any={}
    for(const item of formItems){
      formOriginData[item.field]=''
    }
    const formData = ref(formOriginData)

    // 优化2：用户点击重置按钮
    const handleResetClick=()=>{
      // 表单双向绑定数据要重置
      // 方法1：如果这样做，子组件的formData实际上做了一个浅拷贝，我们改变modelValue子组件的formData是监听不到的
      // formData.value=formOriginData

      // 方法2：所以上边的方法是错误的
      // 下面这种是正确的，可以引起子组件浅拷贝的formData的值变化,这种不太好理解
      // for(const key in formOriginData){
      //   formData.value[`${key}`]=formOriginData[key]
      // }

      // 方法3：便于理解
      // 我们子组件的双向绑定也是用v-model实现的，其实子组件的双向绑定我们可以用modelValue来实现的
      formData.value=formOriginData
      emit('resetBtnClick')
    }

    // 优化3：点击搜索按钮
    const handleSearchClick=()=>{
      emit('queryBtnClick',formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleSearchClick
    };
  },
});
</script>

<style scoped lang="less">
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
