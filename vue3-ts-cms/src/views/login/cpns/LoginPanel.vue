<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <avatar></avatar>
            </el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><iphone /></el-icon>
            <span>手机号登录</span>
          </span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" size="large" @click="handleBtnClick">点击登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref ,onMounted} from "vue";
import LoginAccount from "./LoginAccount.vue";
import LoginPhone from "./LoginPhone.vue";

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone,
  },
  setup() {
    const isKeepPassword = ref(true);

    const accountRef=ref<InstanceType<typeof LoginAccount>>()

    const handleBtnClick = () => {
      accountRef.value?.loginAction()
    };

    // 通过ref是可以拿到子组件的，就可以访问子组件setup返回给我们的属性和方法
    // onMounted(()=>{
    //   console.log(accountRef.value)
    // })
    return {
      handleBtnClick,
      isKeepPassword,
      accountRef
    };
  },
});
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;
}
.title {
  text-align: center;
}

.demo-tabs {
  width: 320px;
}

.account-control{
  margin-top:10px;
  display: flex;
  justify-content: space-between;
}

.el-button {
  width: 100%;
  margin-top:10px;
}
</style>
