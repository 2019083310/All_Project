<template>
  <div class="uses">
    <!--面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/personCenter' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>病人挂号信息列表</el-breadcrumb-item>
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
      <el-table :data="userlist" style="width: 100%" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="doctor" label="挂号医生"></el-table-column>
        <el-table-column prop="regTime" label="预约时间"></el-table-column>
        <el-table-column prop="state" label="就诊状态"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { request } from "../../network/request";
export default {
  name: "UserReg",
  data() {
    return {
      userlist: [],
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
        url: "/doctor/allRegInfo",
        method: "get",
        params: {
          role: 0,
          state:'成功预约'
        },
      }).then((res) => {
        if (res.data.data.state === true) {
          // console.log(res)
          this.$message.success("获取所有病人挂号信息列表成功!")
          this.userlist = res.data.data["newArr"]
        } else {
          return this.$message.error("获取所有病人挂号信息列表失败!")
        }
      });
    }
  },
  created() {
    this.getUserList();
  },
};
</script>

<style>
.uses .box-card {
  margin-top: 15px;
}

.uses .el-table {
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
}

.uses .el-pagination {
  margin-top: 15px;
}
</style>