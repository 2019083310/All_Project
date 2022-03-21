<template>
  <div>
    <ly-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="handle-btns">
          <el-button type="info">重置</el-button>
          <el-button type="primary">搜索</el-button>
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
  setup() {
    const formData = ref({
      name: "",
      realname: "",
      phone: "",
      status: "",
      createTime: "",
    });

    return {
      formData,
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
