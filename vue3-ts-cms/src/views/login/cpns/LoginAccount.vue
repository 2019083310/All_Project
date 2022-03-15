<template>
  <div class="login-account">
    <el-form ref='loginForm' :rules='rules' :model="account" label-width="60px">
      <el-form-item label='账号:' prop="name">
        <el-input v-model='account.name'></el-input>
      </el-form-item>
      <el-form-item label='密码:' prop='password'>
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent ,reactive,ref} from 'vue'
import {rules} from '../config/config'
import {ElForm} from 'element-plus'
import localCache from '../../../utils/cache'

import {useStore} from 'vuex'

export default defineComponent({
  setup () {
    const store=useStore()

    const account=reactive({
      name:localCache.getCache('name')??'',
      password:localCache.getCache('password')??''
    })

    const loginForm=ref<InstanceType<typeof ElForm>>()

    const loginAction=(isKeepPassword:boolean)=>{
      loginForm.value?.validate(valid=>{
        if(valid){
          // 1.判断是否需要记住密码
          if(isKeepPassword){
            // 本地缓存
            localCache.setCache('name',account.name)
            localCache.setCache('password',account.password)
          }else{
            localCache.removeCache('name')
            localCache.removeCache('password')
          }

          // 2.开始进行登录验证
          store.dispatch('loginModule/accountLoginAction',{...account})
        }
      })
    }
    return {
      account,
      rules,
      loginForm,
      loginAction
    }
  }
})
</script>

<style scoped lang='less'>

</style>
