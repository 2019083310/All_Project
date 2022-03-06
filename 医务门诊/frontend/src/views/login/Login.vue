<template>
  <div id="wrap">
    <div id="header">
      <h1>民大发热门诊挂号服务平台</h1>
      <h2>您的健康顾问</h2>
    </div>
    <div class="zhuTi">
      <div id="signForm">
        <el-tabs :tab-position="tabPosition" style="height: 150px">
          <el-tab-pane label="用户登录"></el-tab-pane>
          <el-tab-pane label="医生登录"></el-tab-pane>
          <el-tab-pane label="管理员登录"></el-tab-pane>
        </el-tabs>
        <el-form
          :model="logInForm"
          status-icon
          :rules="logInRules"
          ref="logForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号：" prop="phone">
            <el-input
              v-model.number="logInForm.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
              type="password"
              v-model="logInForm.password"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="regForm" v-show='bool'>注册</el-button>
          </el-form-item>
        </el-form>
        <!-- <span class='signUp'>没有注册过？马上注册</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import {request} from '../../network/request'
export default {
  name: "Login",
  data() {
    return {
      logInForm: {
        phone:'',
        password:''
      },
      logInRules: {
        phone:[
          {
            type:'number',
            trigger:'blur',
            message:'请输入手机号'
          }
        ]
      },
      tabPosition:'top',
      role:0,
      bool:true
    };
  },
  methods: {
    submitForm() {
      this.$refs.logForm.validate(valid=>{
        if(!valid){
          return this.$message.error('请填写正确的信息!')
        }
        request({
          url:'/user/signUp',
          method:'post',
          data:{
            role:this.role,
            phone:this.logInForm['phone'],
            password:this.logInForm['password']
          }
        }).then(res=>{
          // console.log(res)
          if(res.data.data.state===true){
            window.sessionStorage.setItem('token',res.headers['x-access-token'])
            window.sessionStorage.setItem('id',res.data.data.id)
            if(res.data.data.role===0){
              this.$router.push('/reg')
            }else if(res.data.data.role===1){
              this.$router.push('/doctor')
            }else{
              this.$router.push('/admin')
            }
            this.$refs.logForm.resetFields()
            return this.$message.success('登陆成功!')
          }else{
            return this.$message.error('用户名或密码错误!')
          }
        })
      })
    },
    regForm() {
      this.$router.push("/register");
    }
  },
};
</script>

<style>
#header {
  height: 100px;
  border: 2px solid #eee;
}
#header h1 {
  color: rgb(44, 158, 173);
  display: inline-block;
  margin-left: 300px;
}
#header h2 {
  margin-left: 300px;
  display: inline-block;
  color: rgb(141, 137, 137);
}
.zhuTi {
  height: 630px;
  background: url("../../assets/images/login_bg2.png") no-repeat;
  background-size: cover;
}
#signForm {
  width: 350px;
  position: absolute;
  top: 230px;
  left: 1050px;
  height: 380px;
  border: 1px solid #fff;
  background-color: white;
  border: 2px solid #eee;
}
#signForm .el-form {
  position: absolute;
  width: 300px;
  top: 100px;
}
#signForm .el-tabs {
  margin-left: 50px;
  margin-top: 20px;
  color: rgb(46, 180, 180);
  font-size: 27px;
  display: inline-block;
  /* height: 100px; */
}
#signForm .el-button {
  width: 80px;
  /* margin-left:100px; */
}
</style>