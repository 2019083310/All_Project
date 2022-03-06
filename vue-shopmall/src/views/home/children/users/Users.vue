<template>
  <div class='users'>
    <!--面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class='box-card'>
      <el-row :gutter='20'>
        <el-col :span='7'>
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容" v-model='queryInfo.query' clearable @clear='getUserList'>
            <el-button icon="el-icon-search" slot='append' @click='getUserList'></el-button>
          </el-input>
        </el-col>
        <el-col :span='4'>
          <el-button type='primary' @click='addDialogVisible=true'>用户添加</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data='userlist' style='width:100%;' border stripe>
        <el-table-column label='#' type='index'></el-table-column>
        <el-table-column prop='username' label='姓名'></el-table-column>
        <el-table-column prop='email' label='邮箱'></el-table-column>
        <el-table-column prop='mobile' label='电话'></el-table-column>
        <el-table-column prop='role_name' label='角色'></el-table-column>
        <el-table-column label='状态'>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"
              @change="userStatuChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label='操作'>
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type='primary' icon='el-icon-edit' size='mini' @click='showDialog(scope.row.id)'></el-button>
            <!-- 删除按钮 -->
            <el-button type='danger' icon='el-icon-delete' size='mini' @click='deleteDialog(scope.row.id)'></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button type='warning' icon='el-icon-setting' size='mini' @click='setRoles(scope.row)'></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
        @size-change="handleSizeChange" :page-size="queryInfo.pagesize" :page-sizes="[2, 3, 4, 5]"
        layout="total, sizes, prev, pager, next, jumper" :total="this.total">
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @close='addDialogClosed'>
      <!-- 内容主题区域 -->
      <el-form label-width="70px" ref="addFormRef" :model="addForm" :rules="addFormRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click='addUser'>确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息对话框 -->
    <el-dialog title="修改用户" @close="aditClosed" :visible.sync="editDialogVisble" width="50%">
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisble = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="setRolesDialogVisible" @close="setRolesDialogClosed" width="50%">
      <div>
        <p>当前的用户 : {{ userInfo.username }}</p>
        <p>当前的角色 : {{ userInfo.role_name }}</p>
        <p>
          分配新角色:
          <el-select v-model="selectRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRolesInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getUserList
  } from '../../../../network/home'
  import {
    request
  } from '../../../../network/request.js'
  export default {
    name: 'Users',
    data() {
      return {
        userlist: [],
        total: 0,
        //获取用户列表的参数数据
        queryInfo: {
          //搜索值
          query: '',
          //当前页数
          pagenum: 1,
          //当前每次显示多少数据
          pagesize: 2
        },
        // 控制用户对话框的显示和隐藏
        addDialogVisible: false,
        //添加用户数据对象
        addForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        //用户添加数据的规则
        addFormRules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }, {
            min: 3,
            max: 10,
            message: '用户名的长度在3-10个字符之间',
            trigger: 'blur'
          }, ],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }, {
            min: 3,
            max: 10,
            message: '密码的长度在3-10个字符之间',
            trigger: 'blur'
          }, ],
          email: [{
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }, {
            min: 8,
            max: 18,
            message: '邮箱的长度在8-18个字符之间',
            trigger: 'blur'
          }, ],
          mobile: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }, {
            min: 11,
            max: 20,
            message: '手机号的长度在11-20个字符之间',
            trigger: 'blur'
          }, ]
        },
        //控制修改对话框的显示与隐藏
        editDialogVisble: false,
        //修改数据的保存
        editForm: {},
        //删除信息对话框控制
        deleteDialogVisible: false,
        //展示分配角色对话框
        setRolesDialogVisible:false,
        // 需要被分配角色的用户信息
        userInfo: {},
        // 分配角色列表
        rolesList: [],
        // 保存已经选中的角色id值
        selectRoleId: '',
      }
    },
    methods: {
      getUserList() {
        getUserList(this.queryInfo).then(res => {
          this.$message.success('获取用户列表成功!')
          this.userlist = res.data.users
          this.total = res.data.total
          // console.log(res)
        })
      },
      //监听Pagesize改变事件，每页显示的个数
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.queryInfo.pagesize = val
        this.getUserList()
      },
      //监听页码值改变的事件，当前页面值
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.queryInfo.pagenum = val
        this.getUserList()
      },
      userStatuChanged(userinfo) {
        request({
          url: `/users/${userinfo.id}/state/${userinfo.mg_state}`,
          method: 'put'
        }).then(res => {
          return this.$message.success('更新用户状态成功!')
        }, error => {
          userinfo.mg_state = !userinfo.mg_state
          return this.$message.error('更新用户状态失败!')
        })
      },
      // 监听添加用户的对话框关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      //点击按钮，添加新用户
      addUser() {
        this.$refs.addFormRef.validate(valid => {
          if (!valid) {
            return;
          }
          request({
            url: '/users',
            method: 'post',
            data: this.addForm
          }).then(res => {
            this.addDialogVisible = false //隐藏添加用户的对话框
            //添加后重新获取用户数据，不需要手动刷新
            this.getUserList()
            return this.$message.success('用户添加成功了!')
          })
        })
      },
      //展示编辑用户对话框
      showDialog(id) {
        request({
          url: '/users/' + id
        }).then(res => {
          this.editForm = res.data
          this.editDialogVisble = true
        }, error => {
          return this.$message.error('查询用户信息失败')
        })
      },
      aditClosed() {
        this.$refs.editFormRef.resetFields()
      },
      editUserInfo() {
        this.$refs.editFormRef.validate(valid => {
          if (!valid) {
            return;
          }
          request({
            url: '/users/' + this.editForm.id,
            method: 'put',
            data: {
              email: this.editForm.email,
              mobile: this.editForm.mobile
            }
          }).then(res => {
            this.editDialogVisble = false
            this.getUserList()
            return this.$message.success('修改信息成功!')
          })
        })
      },
      //删除用户信息
      async deleteDialog(id) {
        const confirmResult= await this.$confirm('此操作将永久删除该文件, 是否继续?', '永久删除该用户', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err); 
        // console.log(confirmResult)
        // 用户点击了删除,则返回字符串 confirm
        // 用户取消了删除,则返回字符串 cancel
        if(confirmResult==='confirm'){
          request({
            url:'/users/'+id,
            method:'delete'
          }).then(res=>{
            this.getUserList()
            return this.$message.success("该用户已删除!")
          })
        }else{
          return this.$message.error('该用户取消删除')
        }
      },
      //展示分配角色对话框
      setRoles(userInfo){
        this.userInfo=userInfo
        //获取所有的角色列表
        request(
          {
            url:'/roles'
          }
        ).then(res=>{
          this.rolesList=res.data
          this.setRolesDialogVisible=true
        })
      },
      setRolesDialogClosed(){
        this.selectRoleId=''
        this.userInfo=''
      },
      saveRolesInfo(){
        if(!this.selectRoleId){
          return this.$message.error('请选择要分配的角色')
        }
        request({
          url:`/users/${this.userInfo.id}/role`,
          method:'put',
          data:{
            rid:this.selectRoleId
          }
        }).then(res=>{
          this.setRolesDialogVisible=false
          this.getUserList()
          return this.$message.success('更新角色成功!')
        })
      }
    },
    created() {
      this.getUserList()
    },
  }
</script>

<style>
  .box-card {
    margin-top: 15px;
  }

  .el-table {
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
  }

  .el-pagination {
    margin-top: 15px;
  }
</style>