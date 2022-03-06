<template>
  <el-form ref="loginFormRef" :model="loginForm" label-width="0px" class='login_form' :rules='loginFormRules'>
    <el-form-item prop='username'>
      <el-input v-model="loginForm.username" prefix-icon='iconfont icon-user'></el-input>
    </el-form-item>
    <el-form-item prop='password'>
      <el-input type='password' v-model='loginForm.password' prefix-icon="iconfont icon-3702mima"></el-input>
    </el-form-item>
    <el-form-item class='btns'>
      <el-button type='primary' @click='login' :loading='loginLoading'>登录</el-button>
      <el-button type='info' @click='resetLoginForm'>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {
    request
  } from '../../../network/request'
  export default {
    name: 'Form',
    data() {
      return {
        loginLoading: false, //登录限制
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        loginFormRules: {
          username: [{
              required: true,
              message: '请输入登录用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 15,
              message: '长度在3-15个字符',
              trigger: 'blur'
            }
          ]
        },
        // 验证密码是否合法
        password: [{
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    },
    methods: {
      resetLoginForm() {
        // 点击重置按钮,重置登录表单
        // this.$refs[loginFormRef].resetFields()
        this.$refs.loginFormRef.resetFields()
      },
      login() {
        this.loginLoading = true
        this.$refs.loginFormRef.validate(valid => {
          if (!valid) {
            return (this.loginLoading = false)
          }
          request({
            url: '/login',
            method: 'post',
            data: this.loginForm
          }).then(res => {
            if (res.meta.status !== 200) {
              this.loginLoading=false
              return this.$message.error('登陆失败 账号或密码错误!')
            }
            this.$message.success('登陆成功!')
            // console.log(res)
            // 1. 将登录成功之后的 token,保存到客户端的 sessionStorage(会话机制/只在当前页面生效)中 localStorage(持久话机制/关闭页面也不会忘记数据)
            //   1.1 项目中除了登录之外的API接口,必须在登录之后才能访问
            //   1.2 token 只应在当前网站打开期间生效, 所以将 token 保存在 sessionStorage中
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
            this.loginLoading=false
          })
        })
      }
    },
  }
</script>

<style>
  .login_form {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>