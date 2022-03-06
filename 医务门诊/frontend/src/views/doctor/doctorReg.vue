<template>
  <div class="ret">
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
            @clear="getUserRegList"
          >
            <el-button
              icon="el-icon-search"
              slot="append"
              @click="getUserRegList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userRegList" style="width: 100%" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="time" label="预约时间"></el-table-column>
        <el-table-column prop="state" label="就诊状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showDialog(scope.row.phone)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              disabled
              @click="deleteDialog(scope.row.phone)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改用户信息对话框 -->
    <el-dialog
      title="修改用户"
      @close="editClosed"
      :visible.sync="editDialogVisible"
      width="40%"
    >
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="80px"
      >
        <el-form-item label="state">
          <el-input v-model="editForm.state"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "../../network/request";
export default {
  name: "doctorReg",
  data() {
    return {
      userRegList: [],
      //获取用户列表的参数数据
      queryInfo: {
        //搜索值
        query: "",
        //当前页数
        pagenum: 1,
        //当前每次显示多少数据
        pagesize: 2,
      },
      editDialogVisible: false,
      editForm: {
       state:''
      },
      addFormRules:{},
      phone:''
    };
  },
  methods: {
    getUserRegList() {
      request({
        url: "/doctor/info",
        method: "get",
        params: {
          id:window.sessionStorage.getItem('id')
        },
      }).then((res) => {
        if (res.data.data.state === true) {
          this.userRegList = res.data.data["obj"]['userList'];
        } else {
          return this.$message.error("获取病人信息列表失败!");
        }
      });
    },
    showDialog(phone) {
      this.editDialogVisible = true
      this.phone=phone
    },
    editClosed() {
      this.$refs.editFormRef.resetFields();
    },
    editUserInfo() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) {
          return;
        }
        request({
          url: '/doctor/editRegState',
          method: "put",
          data: {
            id:window.sessionStorage.getItem('id'),
            state:this.editForm.state,
            phone:this.phone
          }
        }).then((res) => {
          this.editDialogVisible = false
          this.getUserRegList();
          this.editForm.state=''
          return this.$message.success("修改信息成功!");
        });
      });
    },
  },
  created() {
    this.getUserRegList();
  },
};
</script>

<style>
.ret .box-card {
  margin-top: 15px;
}

.ret .el-table {
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
}

.ret .el-pagination {
  margin-top: 15px;
}
</style>