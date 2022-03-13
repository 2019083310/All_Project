<template>
  <div>
    <el-form ref="loginForm" :rules="rules" :model="account" label-width="70px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="account.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="password">
        <div class='get-code'>
          <el-input v-model="account.password"></el-input>
          <el-button type="primary" class="get-btn">验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { rules } from "../config/config";

export default defineComponent({
  setup() {
    const account = reactive({
      phone: "",
      password: "",
    });

    return {
      account,
      rules,
    };
  },
});
</script>

<style scoped lang='less'>
.get-code {
  display: flex;
}
.get-btn{
  margin-left:8px;
}
</style>
