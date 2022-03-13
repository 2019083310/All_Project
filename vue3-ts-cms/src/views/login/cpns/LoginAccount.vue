<template>
  <div class="login-account">
    <el-form ref='loginForm' :rules='rules' :model="account" label-width="60px">
      <el-form-item label='账号:' prop="name">
        <el-input v-model='account.name'></el-input>
      </el-form-item>
      <el-form-item label='密码:' prop='password'>
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent ,reactive,ref} from 'vue'
import {rules} from '../config/config'
import {ElForm} from 'element-plus'

export default defineComponent({
  setup () {
    const account=reactive({
      name:'',
      phone:''
    })

    const loginForm=ref<InstanceType<typeof ElForm>>()

    const loginAction=()=>{
      loginForm.value?.validate(valid=>{
        if(valid){
          console.log('登陆成功')
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
