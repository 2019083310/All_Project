<template>
  <div>
    <div id="head">
      <h1>民大发热门诊挂号服务平台</h1>
      <h2>您的健康顾问</h2>
    </div>
    <div id="form">
      <div id='sign'>
        <span id='in'>用户注册</span>
        <span id='on'>我已注册，现在就</span>
        <el-button type='primary' @click='signIn'>登录</el-button>
      </div>
      <div id='back'><span>请如实填写以下信息!</span></div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="rulForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号:" prop="identify">
          <el-input v-model="ruleForm.identify"></el-input>
        </el-form-item>
        <el-form-item label="电话号:" prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
         <el-form-item label="邮箱:" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
         <el-form-item label="学号:" prop="sno">
          <el-input v-model.number="ruleForm.sno"></el-input>
        </el-form-item>
        <el-form-item label="年齡:" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="居住地:" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="registerForm">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {request} from '../../network/request'
export default {
  name: "Register",
  data() {
    return {
      ruleForm: {
        username:'',
        password:'',
        name:'',
        sex:'',
        identify:'',
        phone:'',
        address:'',
        email:'',
        sno:'',
        age:''
      },
      rules: {
        username:[
          {
            required:true,
            trigger:'blur',
            message:'请填写用户名'
          },
          {
            min:2,
            max:15,
            trigger:'blur',
            message:'长度在2-15个字符之间'
          }
        ],
        password:[
          {
            required:true,
            trigger:'blur',
            message:'请填写密码'
          },
          {
            min:2,
            max:15,
            trigger:'blur',
            message:'长度在2-15个字符之间'
          }
        ],
        name:[
          {
            required:true,
            trigger:'blur',
            message:'请填写真实姓名'
          },
          {
            min:2,
            max:8,
            trigger:'blur',
            message:'长度在2-8个字符之间'
          }
        ],
        phone:[
          {
            required:true,
            trigger:'blur',
            message:'请填写手机号'
          },
          {
            type:'number',
            message:'手机号必须为数字值'
          }
        ],
        address:[
          {
            required:true,
            trigger:'blur',
            message:'请填写居住地址'
          },
          {
            min:2,
            max:15,
            trigger:'blur',
            message:'长度在2-15个字符之间'
          }
        ],
        identify:[
          {
            required:true,
            trigger:'blur',
            message:'请填写身份证号'
          }
        ],
        email:[
          {
            required:true,
            trigger:'blur',
            message:'请填写邮箱'
          },
          {
            min:6,
            max:15,
            trigger:'blur',
            message:'邮箱长度为6-15位'
          }
        ],
        sno:[
          {
            required:true,
            trigger:'blur',
            message:'请填写个人身份标识号'
          },
          {
            type:'number',
            message:'个人标识为数字值'
          }
        ]
      },
    };
  },
  methods: {
    signIn(){
      this.$router.push('/login')
    },
    registerForm() {
      this.$refs.rulForm.validate(valid=>{
        if(!valid){
          return this.$message.error('请确认注册信息无误后再次注册')
        }
        request({
          url:'/user/signIn',
          method:'post',
          data:this.ruleForm
        }).then(res=>{
          // console.log(res);
          if(res.data.data.message==='注册成功'){
            this.$message.success('恭喜你注册成功!')
            this.$router.push('/login')
          }else{
            return this.$message.error('用户名已存在!')
          }
        })
      })
    },
  },
};
</script>

<style>
#head {
  height: 100px;
  border:2px solid #eee;
}

#head h1 {
  color: rgb(44, 158, 173);
  display: inline-block;
  margin-left:300px;
}
#head h2 {
  margin-left: 300px;
  display: inline-block;
  color: rgb(141, 137, 137);
}
#form{
  width: 800px;
  border:3px solid rgb(228, 218, 218);
  margin:30px auto;
  background-color: #eee;
}
#sign{
  height: 70px;
  width: 750px;
  border-bottom: 1px solid rgb(19, 18, 18);
  margin:0 auto;
}
#in{
  margin-left:10px;
  color:rgb(9, 190, 245);
  font-size: 25px;
  display: inline-block;
  line-height: 70px;
}
#on{
  margin-left:400px;
  margin-right:10px;
}
#back{
  width: 750px;
  line-height: 30px;
  background-color: rgb(172, 172, 241);
  margin:15px auto;
}
#back span{
  margin-left:30px;
}
#form .el-form {
  width: 500px;
  margin-top:30px;
}
#form .el-form .el-button{
  margin-left:100px;
  background-color: rgb(248, 136, 31);
}
</style>