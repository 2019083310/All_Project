<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/personCenter' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-descriptions title="个人基本信息">
          <el-descriptions-item label="姓名"
            >{{this.personInfo.name}}</el-descriptions-item
          >
          <el-descriptions-item label="手机号"
            >{{this.personInfo.phone}}</el-descriptions-item
          >
          <el-descriptions-item label="邮箱"
            >{{this.personInfo.email}}</el-descriptions-item
          >
          <el-descriptions-item label="年龄"
            >{{this.personInfo.age}}</el-descriptions-item
          >
          <el-descriptions-item label="注册日期"
            >{{this.personInfo.registerTime}}</el-descriptions-item
          >
        </el-descriptions>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {request} from '../../network/request'
export default {
  name:"Person",
  data(){
    return {
      personInfo:{}
    }
  },
  methods: {
    getPersonInfo(){
      request({
        url:'/user/findUserInfo',
        method:'get',
        params:{
          id:window.sessionStorage.getItem('id')
        }
      }).then(res=>{
        this.personInfo=res.data.data['obj']
      })
    }
  },
  created() {
    this.getPersonInfo()
  },
};
</script>

<style>
.box-card {
  margin-top: 15px;
  /* height: 300px; */
}
.el-descriptions{
  width: 800px;
  height: 120px;
  margin-top:10px;
  margin-left:50px;
}
</style>