<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数!" type="warning" show-icon></el-alert>
      <el-row>
        <el-col clsss='cat_lie'>
          <span>选择商品分类:</span>
          <el-cascader clearable v-model="selectedKeys" :options="cateList" :props="{ expandTrigger: 'hover',...cascaderprops}" @change="handleChange"></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type='primary' size='mini' :disabled='isBtnDisabled' @click='addDialogVisible = true'>添加参数</el-button>
          <el-table border stripe :data='manyTableData' class='table1'>
            <el-table-column type='expand'>
              <template slot-scope="scope">
                <el-tag closable v-for='(item,index) in scope.row.attr_vals' :key='index' @close='handleClosed(index, scope.row)'>{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type='index' label='#'></el-table-column>
            <el-table-column label='参数列表' prop='attr_name'></el-table-column>
            <el-table-column label='操作'>
              <template slot-scope="scope">
                <el-button type='primary' icon='el-icon-edit' size='mini' @click='showEditDialog(scope.row.attr_id)'>编辑</el-button>
                <el-button type='danger' icon='el-icon-delete' size='mini' @click='removeParams(scope.row.attr_id)'>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <el-button size='mini' type='primary' :disabled='isBtnDisabled' @click='addDialogVisible = true'>添加属性</el-button>
          <el-table border stripe :data='onlyTableData' class='table2'>
            <el-table-column type='expand'>
              <template slot-scope="scope">
                <el-tag closable v-for='(item,index) in scope.row.attr_vals' :key='index' @close='handleClosed(index, scope.row)'>{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type='index' label='#'></el-table-column>
            <el-table-column label='参数列表' prop='attr_name'></el-table-column>
            <el-table-column label='操作'>
              <template slot-scope="scope">
                <el-button type='primary' icon='el-icon-edit' size='mini' @click='showEditDialog(scope.row.attr_id)'>编辑</el-button>
                <el-button type='danger' icon='el-icon-delete' size='mini' @click='removeParams(scope.row.attr_id)'>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数的对话框 -->
    <el-dialog :title="'添加' + titleText" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 修改参数对话框 -->
    <el-dialog :title="'修改' + titleText" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {request} from '../../../../../network/request'
  export default {
    name: 'Params',
    data() {
      return {
        cateList:[],
        cascaderprops:{
          value:'cat_id',
          label:'cat_name',
          children:'children'
        },
        selectedKeys:[],//级联选择框双向绑定到id
        activeName:'many',
        // 动态参数数据
        manyTableData: [],
        // 静态属性数据
        onlyTableData: [],
        addDialogVisible:false,//控制添加对话框的显示
        addForm:{},//添加参数保存
        addFormRules:{},//验证规则
        // 控制修改对话框的显示和隐藏
        editDialogVisible: false,
        // 修改的表单对象
        editForm: {},
        editFormRules:{},
      }
    },
    methods: {
      //获取所有商品分类列表
      getCateList(){
        request({
          url:'/categories'
        }).then(res=>{
          this.cateList=res.data
          // console.log(this.cateList)
        })
      },
      handleChange(){
        this.getParamsData()
      },
      handleClick(){
        // console.log(this.activeName)
        this.getParamsData()
      },
      // 获取参数的列表数据
      getParamsData(){
        if(this.selectedKeys.length!==3){
          //证明选中的不是三级分类
          this.selectedKeys=[]
          this.manyTableData = []
          this.onlyTableData = []
          return 
        }
        //选中的是三级分类
        // console.log(this.selectedKeys)
        //根据所选ID和当前所处面板获取对应参数
        request({
          url:`/categories/${this.cateId}/attributes`,
          params:{
            sel:this.activeName
          }
        }).then(res=>{
          // console.log(res)
          res.data.forEach(item=>{
            item.attr_vals=item.attr_vals?item.attr_vals.split(' '):[]
            item.inputVisible=false
            item.inputValue=''
          })
          if(this.activeName==='many'){
            this.manyTableData=res.data
          }else{
            this.onlyTableData=res.data
          }
        })
      },
      //添加对话框的关闭事件
      addDialogClosed(){
        this.$refs.addFormRef.resetFields()
      },
      addParams(){
        this.$refs.addFormRef.validate(valid=>{
          if(!valid){
            return this.$message.error('添加失败!')
          }
          request({
            url:`/categories/${this.cateId}/attributes`,
            method:'post',
            data:{
              attr_name:this.addForm.attr_name,
              attr_sel:this.activeName
            }
          }).then(res=>{
            this.getParamsData()
            this.addDialogVisible=false
          })
        })
      },
      editDialogClosed(){
        this.$refs.editFormRef.resetFields()
      },
      editParams(){
        request({
          url:`/categories/${this.cateId}/attributes/${
            this.editForm.attr_id
          }`,
          method:'put',
          data:{
            attr_name:this.editForm.attr_name,
            attr_sel:this.activeName
          }
        }).then(res=>{
          this.getParamsData()
          this.editDialogVisible=false
          return this.$message.success('修改信息成功!')
        })
      },
      showEditDialog(id){
        request({
          url:`/categories/${this.cateId}/attributes/${id}`,
          params:{
            attr_sel:this.activeName
          }
        }).then(res=>{
          this.editForm=res.data
          this.editDialogVisible=true
        })
      },
      async removeParams(id){
        const confirmResult = await this.$confirm('此操作将永久删除该分类, 是否继续?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除操作!')
        }
        request({
          url:`/categories/${this.cateId}/attributes/${id}`,
          method:'delete'
        }).then(res=>{
          this.getParamsData()
          return this.$message.success('删除成功!')  
        })
      },
      //文本框失去焦点或摁下enter都会触发
      handleInputConfirm(row){
        // console.log('ok')
        if(row.inputValue.trim().length===0){
          row.inputValue=''
          row.inputVisible=false
          return
        }
        //如果没有return证明内容不为空
        row.attr_vals.push(row.inputValue.trim())
        row.inputValue=''
        row.inputVisible=false
        //发送请求，保存
        this.saveAttrVals(row)
      },
      saveAttrVals(row){
        request({
          url:`/categories/${this.cateId}/attributes/${row.attr_id}`,
          method:'put',
          data:{
            attr_sel:this.activeName,
            attr_name:row.attr_name,
            attr_vals:row.attr_vals.join(' ')
          }
        }).then(res=>{
          return this.$message.success('标签属性修改成功!')
        })
      },
      //点击按钮显示文本输入框
      showInput(row){
        row.inputVisible=true
        // 自动获取焦点
        // $nextTick 方法作用: 当页面上的元素被重新渲染之后,才会指定回调函数中的代码
        this.$nextTick(_=>{
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      // Tag标签的删除
      handleClosed(index, row) {
        row.attr_vals.splice(index, 1)
        this.saveAttrVals(row)
      },
    },
    created() {
      this.getCateList()
    },
    computed:{
      //按钮的禁用
      isBtnDisabled(){
        if(this.selectedKeys.length!==3){
          return true
        }else{
          return false
        }
      },
      cateId(){
        if(this.selectedKeys.length===3){
          return this.selectedKeys[2]
        }
        return null;
      },
      titleText(){
        if(this.activeName==='many'){
          return '动态参数'
        }else{
          return '静态参数'
        }
      }
    }
  }
</script>

<style>
  .el-card{
    margin-top:15px;
  }
  .cat_lie{
    margin-top:15px;
  }
  .el-cascader{
    margin-left:20px;
    margin-top:15px;
  }
  .el-tabs{
    margin-top:15px;
  }
  .table1,.table2{
    margin-top:15px;
  }
  .el-tag{
    margin:5px;
  }
  .input-new-tag{
    width: 80px;
    margin: 5px 10px;
    vertical-align: bottom;
  }
</style>