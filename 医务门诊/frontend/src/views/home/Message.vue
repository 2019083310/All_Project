<template>
  <div class="u">
    <!--面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/reg' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>历史挂号信息</el-breadcrumb-item>
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
        <el-table-column prop="doctor" label="医生姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="regTime" label="就诊时间"></el-table-column>
        <el-table-column prop="state" label="就诊状态"></el-table-column>
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
        url: "/user/regHistory",
        method: "get",
        params: {
          id:window.sessionStorage.getItem('id')
        },
      }).then((res) => {
        if (res.data.data.state === true) {
          this.$message.success("获取用户历史挂号信息成功!");
          this.userList = res.data.data["regList"];
        } else {
          return this.$message.error("获取用户历史挂号信息失败!");
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
.u .box-card {
  margin-top: 15px;
}

.u .el-table {
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
}

.u .el-pagination {
  margin-top: 15px;
}
</style>