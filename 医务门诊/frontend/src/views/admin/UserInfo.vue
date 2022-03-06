<template>
  <div class="urs">
    <!--面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户挂号信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加区域 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              icon="el-icon-search"
              slot="append"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="identify" label="身份证号"></el-table-column>
        <el-table-column prop="doctor" label="预约医生"></el-table-column>
        <el-table-column prop="registerTime" label="挂号时间"></el-table-column>
        <el-table-column prop="state" label="问诊状态"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { request } from "../../network/request";
export default {
  name: "User",
  data() {
    return {
      userList: [],
      total: 0,
      //获取用户列表的参数数据
      queryInfo: {
        //搜索值
        query: "",
        //当前页数
        pagenum: 1,
        //当前每次显示多少数据
        pagesize: 2,
      },
    }
  },
  methods: {
    getUserList() {
      request({
        url: "/user/regInfo",
        method: "get",
        params: {
          role: 0,
        },
      }).then((res) => {
        if (res.data.data.state === true) {
          // console.log(res)
          this.$message.success("获取用户挂号信息成功!");
          this.userlist = res.data.data["newArr"];
          this.total = res.data.data["total"];
          // console.log(this.userlist)
        } else {
          return this.$message.error("获取用户挂号信息失败!");
        }
      });
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style>
.urs .box-card {
  margin-top: 15px;
}

.urs .el-table {
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
}

.urs .el-pagination {
  margin-top: 15px;
}
</style>