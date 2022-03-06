<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片面板 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type='primary' @click='addDialogVisible=true'>添加角色</el-button>
        </el-col>
      </el-row>
      <el-table border :data='this.rolesList' stripe>
        <!-- 展开列 -->
        <el-table-column type='expand'>
          <template slot-scope="scope">
            <el-row v-for='(item,index) in scope.row.children' :key='item.id'
              :class='["bdtop",index===0?"bdbottom":"","vcenter"]'>
              <!-- 渲染一级权限 -->
              <el-col :span='5'>
                <el-tag closable @close='removeRightById(scope.row,item.id)'>{{item.authName}}</el-tag><i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级权限 -->
              <el-col :span='19'>
                <!-- 通过for循环嵌套渲染二级权限 -->
                <el-row v-for='(item2,index2) in item.children' :key='item2.id'
                  :class="[index2 === 0 ? '' : 'bdtop', 'vcenter']">
                  <el-col :span='6'>
                    <el-tag type='success' closable @close='removeRightById(scope.row,item2.id)'>{{item2.authName}}</el-tag><i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span='18'>
                    <el-tag type="warning" :class="[index3 === 0 ? '' : 'bdtop']"
                      v-for="(item3, index3) in item2.children" :key="item3.id" closable
                      @close="removeRightById(scope.row, item3.id)">
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <pre>{{scope.row}}</pre> -->
          </template>
        </el-table-column>
        <el-table-column label='#' type='index'></el-table-column>
        <el-table-column label='角色名称' prop='roleName'></el-table-column>
        <el-table-column label='角色描述' prop='roleDesc'></el-table-column>
        <el-table-column label='操作'>
          <template slot-scope="scope">
            <el-button icon='el-icon-edit' type='primary' size='mini' @click="showEditDialog(scope.row.id)">编辑
            </el-button>
            <el-button icon='el-icon-delete' type='danger' size='mini' @click='rolesdelete(scope.row.id)'>删除</el-button>
            <el-button icon='el-icon-setting' type='warning' size='mini' @click='showSetRightDialog(scope.row)'>分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" @close="addDislogClosed">
      <el-form :model="addRolesForm" :rules="addFormRules" ref="addRolesForm" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRolesUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="修改角色" :visible.sync="editDialogVisible" width="30%">
      <el-form :model="editRolesForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="SetRightDialogVisible" width="50%" @close="SetRightDialogVisibleClosed">
      <!-- 树形控件 -->
      <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" :default-expand-all="true"
        :default-checked-keys="defKeys" ref="treeRef">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SetRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    request
  } from '../../../../../network/request'
  export default {
    name: 'Roles',
    data() {
      return {
        //权限管理列表
        rolesList: [],
        // 添加角色对话框的显示和隐藏
        addDialogVisible: false,
        addRolesForm: {
          roleName: '',
          roleDesc: ''
        },
        addFormRules: {
          roleName: [{
              required: true,
              message: '请输入添加角色名称',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 10,
              message: '名称长度在5-10个字符',
              trigger: 'blur'
            }
          ],
          roleDesc: [{
              required: true,
              message: '请输入角色描述信息',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '长度在5-20个字符',
              trigger: 'blur'
            }
          ]
        },
        editFormRules: {
          roleName: [{
              required: true,
              message: '请输入添加角色名称',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 10,
              message: '名称长度在5-10个字符',
              trigger: 'blur'
            }
          ],
          roleDesc: [{
              required: true,
              message: '请输入角色描述信息',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '长度在5-20个字符',
              trigger: 'blur'
            }
          ]
        },
        //编辑修改信息
        editRolesForm: {},
        // 编辑对话框的显示和隐藏
        editDialogVisible: false,
        //控制修改权限的对话框的显示与隐藏
        SetRightDialogVisible: false,
        //权限列表
        rightsList: [],
        //树形控件的数据绑定对象
        treeProps: {
          label: 'authName',
          children: 'children'
        },
        // 树形控件 -> 默认选中的节点id值数组
        defKeys: [],
        // 当前即将分配权限的角色的ID
        rolesId: ''
      }
    },
    methods: {
      getRolesList() {
        request({
          url: '/roles'
        }).then(res => {
          this.rolesList = res.data
          // console.log(this.rolesList)
          return this.$message.success('权限列表获取成功!')
        })
      },
      //添加角色对话框重置
      addDislogClosed() {
        this.$refs.addRolesForm.resetFields()
      },
      //添加角色
      addRolesUser() {
        this.$refs.addRolesForm.validate(valid => {
          if (!valid) {
            return;
          }
          request({
            url: '/roles',
            method: 'post',
            data: this.addRolesForm
          }).then(res => {
            this.$message.success('添加角色成功!')
            this.getRolesList()
            this.addDialogVisible = false
          })
        })
      },
      //修改角色
      editFormInfo() {
        request({
          url: '/roles/' + this.editRolesForm.roleId,
          method: 'put',
          data: {
            roleName: this.editRolesForm.roleName,
            roleDesc: this.editRolesForm.roleDesc
          }
        }).then(res => {
          this.getRolesList()
          this.editDialogVisible = false
          return this.$message.success('修改角色信息成功!')
        })
      },
      async rolesdelete(id) {
        const confirmRusult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '删除角色', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        // 没有使用await
        if (confirmRusult !== 'confirm') {
          return this.$message.info('已取消该删除操作')
        }
        request({
          url: '/roles/' + id,
          method: 'delete'
        }).then(res => {
          this.getRolesList()
          return this.$message.success('删除角色信息成功!')
        })
      },
      //修改角色信息
      showEditDialog(id) {
        //得到修改用户信息
        request({
          url: '/roles/' + id,
        }).then(res => {
          this.editRolesForm = res.data
          this.editDialogVisible = true
          // console.log(this.editRolesForm)
        })
      },
      async removeRightById(roles, id) {
        const confirmResult = await this.$confirm('此操作将永久删除该权限，是否继续?', '重要提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return this.$message.info('取消了删除!')
        }
        request({
          url: `/roles/${roles.id}/rights/${id}`,
          method: 'delete'
        }).then(res => {
          roles.children = res.data
        })
      },
      //展示修改分配权限对话框
      showSetRightDialog(role) {
        this.rolesId=role.id
        request({
          url: '/rights/tree'
        }).then(res => {
          //this.getRolesList()
          //直接调用获取用户的方法会导致展开栏的关闭,这样体验不好
          //可以直接把返回的最新数据直接赋值
          this.rightsList = res.data
          //递归的形式获取三级节点
          this.getLeafKeys(role, this.defKeys)
          this.SetRightDialogVisible = true
        })
      },
      // 递归的形式,获取角色下所有的三级权限的id,并保存到 defKeys数组中
      getLeafKeys(node, arr) {
        // 如果当前node没有children属性则是三级节点
        if (!node.children) {
          return arr.push(node.id)
        }
        node.children.forEach(item => this.getLeafKeys(item, arr))
      },
      // 监听分配权限对话框的关闭事件
      SetRightDialogVisibleClosed() {
        // 清空 defkeys 数组  避免累积
        this.defKeys = []
      },
      //分配权限添加权限
      allotRights() {
        const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
        const idStr = keys.join(',')
        // console.log(idStr)
        request({
          url:`/roles/${this.rolesId}/rights`,
          method:'post',
          data:{
            rids:idStr
          }
        }).then(res=>{
          this.SetRightDialogVisible = false
          this.getRolesList()
          return this.$message.success('分配权限成功!')
        })
      }
    },
    created() {
      this.getRolesList()
    },
  }
</script>

<style>
  .el-card {
    margin-top: 15px;
  }

  .el-table {
    margin-top: 15px;
  }

  .el-tag {
    margin: 7px 5px 7px 50px;
  }

  .bdtop {
    border-top: 1px solid #eee;
  }

  .bdbottom {
    border-bottom: 1px solid #eee;
  }

  .vcenter {
    display: flex;
    align-items: center;
  }
</style>