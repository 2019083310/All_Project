<template>
  <div class="us">
    <!--面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/adminCenter' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
            @clear="getAdminList"
          >
            <el-button
              icon="el-icon-search"
              slot="append"
              @click="getAdminList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >管理员添加</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="adminList" style="width: 100%" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
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
              @click="deleteDialog(scope.row.phone)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="40%"
      @close="addDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form
        label-width="100px"
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
      >
        <el-form-item label="真实姓名:" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="phone">
          <el-input v-model.number="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input v-model.number="addForm.age"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息对话框 -->
    <el-dialog
      title="修改用户"
      @close="editClosed"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="80px"
      >
        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model.number="editForm.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="editForm.age"></el-input>
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
  name: "AdminCenter",
  data() {
    return {
      adminList: [],
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
      editDialogVisible: false,
      editForm: {
        name: "",
        age: "",
        email: "",
        phone: "",
        registerTime: "",
      },
      editFormRules: {
        age: [
          {
            type: "number",
            trigger: "blur",
            message: "年龄不能为空",
          },
        ],
        name: [
          {
            required: true,
            trigger: "blur",
            message: "请填写真实姓名",
          },
          {
            min: 2,
            max: 8,
            trigger: "blur",
            message: "长度在2-8个字符之间",
          },
        ],
        email: [
          {
            required: true,
            trigger: "blur",
            message: "请填写邮箱",
          },
          {
            min: 6,
            max: 17,
            trigger: "blur",
            message: "邮箱长度为6-17位",
          },
        ],
      },
      addDialogVisible: false,
      addForm: {
        name: "",
        phone: "",
        password: "",
        email: "",
        age: "",
      },
      addFormRules: {
        age: [
          {
            type: "number",
            trigger: "blur",
            message: "年龄不能为空",
          },
          {
            required: true,
          },
        ],
        name: [
          {
            required: true,
            trigger: "blur",
            message: "请填写真实姓名",
          },
          {
            min: 2,
            max: 8,
            trigger: "blur",
            message: "长度在2-8个字符之间",
          },
        ],
        email: [
          {
            required: true,
            trigger: "blur",
            message: "请填写邮箱",
          },
          {
            min: 6,
            max: 17,
            trigger: "blur",
            message: "邮箱长度为6-17位",
          },
        ],
        phone: [
          {
            type: "number",
            trigger: "blur",
            message: "手机号码不能为空",
          },
          {
            required: true,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "密码必须设置",
          },
        ],
      },
    };
  },
  methods: {
    getAdminList() {
      request({
        url: "/user/findList",
        method: "get",
        params: {
          role: 2,
        },
      }).then((res) => {
        if (res.data.data.state === true) {
          // console.log(res)
          this.$message.success("获取管理员列表成功!");
          this.adminList = res.data.data["newArr"];
          this.total = res.data.data["total"];
          // console.log(this.userlist)
        } else {
          return this.$message.error("获取管理员列表失败!");
        }
      });
    },
    showDialog(phone) {
      request({
        url: "/user/findOne",
        method: "get",
        params: {
          phone: phone,
        },
      }).then(
        (res) => {
          this.editForm = res.data.data["obj"];
          this.editDialogVisible = true;
        },
        (error) => {
          return this.$message.error("查询管理员信息失败");
        }
      );
    },
    async deleteDialog(phone) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "永久删除该用户",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // console.log(confirmResult)
      // 用户点击了删除,则返回字符串 confirm
      // 用户取消了删除,则返回字符串 cancel
      if (confirmResult === "confirm") {
        request({
          url: "/user/deleteInfo",
          method: "delete",
          params: {
            phone: phone,
          },
        }).then((res) => {
          this.getAdminList();
          return this.$message.success("该管理员已删除!");
        });
      } else {
        return this.$message.error("该管理员取消删除");
      }
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
          url: "/user/editInfo",
          method: "put",
          data: this.editForm,
        }).then((res) => {
          this.editDialogVisible = false;
          this.getAdminList();
          return this.$message.success("修改信息成功!");
        });
      });
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) {
          return;
        }
        request({
          url: "/admin/add",
          method: "post",
          data: this.addForm,
        }).then((res) => {
          this.addDialogVisible = false; //隐藏添加用户的对话框
          //添加后重新获取用户数据，不需要手动刷新
          this.getAdminList();
          return this.$message.success("管理员添加成功了!");
        });
      });
    },
  },
  created() {
    this.getAdminList();
  },
};
</script>

<style>
.us .box-card {
  margin-top: 15px;
}

.us .el-table {
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
}

.us .el-pagination {
  margin-top: 15px;
}
</style>