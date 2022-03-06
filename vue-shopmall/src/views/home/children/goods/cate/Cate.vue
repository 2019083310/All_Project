<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-button type='primary' @click='showAddCateDialog'>添加分类</el-button>
      </el-row>
      <!-- 表格 -->
      <tree-table :data='cateList' :columns='columns' :selection-type='false' show-index index-text='#' :expand-type='false' class='tree-table' border stripe>
        <!-- 是否有效 -->
        <template slot='isok' slot-scope="scope">
          <i class='el-icon-success' v-if='scope.row.cat_deleted===false' style='color:lightgreen'></i>
          <i class='el-icon-error' v-else style='color:red'></i>
        </template>
        <!-- 排序 -->
        <template slot-scope="scope" slot='order'>
            <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
            <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <!-- <pre>{{scope.row}}</pre> -->
          <el-button type='primary' size='mini' icon='el-icon-edit' @click="showeditCateDialog(scope.row)">编辑</el-button>
          <el-button type='danger' size='mini' icon='el-icon-delete' @click="removeCate(scope.row.cat_id)">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[3, 5, 10,15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%" @close='addCateDialogClosed'>
      <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <!-- options用来指定数据源 -->
          <!-- props用来指定配置对象 -->
          <el-cascader clearable :options='parentCateList'  :props="{
              expandTrigger: 'hover',
              ...cascaderProps,
              checkStrictly: 'true'
            }" 
          v-model="selectedKeys" @change="parentCateChanged">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑商品分类 -->
    <el-dialog title="修改分类" :visible.sync="editCateDialogVisbel" width="50%">
      <el-form :model="editCate" :rules="editCateRules" ref="editCateRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCate.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisbel = false">取 消</el-button>
        <el-button type="primary" @click="editCateInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {request} from '../../../../../network/request'
  export default {
    name: 'Cate',
    data(){
      return {
        //分类商品信息
        cateList:[],
        //请求参数
        queryInfo:{
          type:3,
          pagenum:1,
          pagesize:5
        },
        //总数据条数
        total:0,
        //为treetable指定
        columns:[
          {
            label:"分类名称",
            prop:'cat_name'
          },
          {
            label:'是否有效',
            type:'template',//表示将此列自定义自己的模板列
            template:'isok'//要使用的模板名字
          },
          {
            label:'排序',
            type:'template',//表示将此列自定义自己的模板列
            template:'order'//要使用的模板名字
          },
          {
            label:'操作',
            type:'template',//表示将此列自定义自己的模板列
            template:'opt'//要使用的模板名字
          }
        ],
        addCateDialogVisible:false,//控制添加对话框的显示
        //添加分类的表单数据对象
        addCateForm:{
          cat_name:'',
          cat_pid:0,//父级分类的id
          cat_level:0//分类层级，莫人要添加的是一级分类
        },
        //校验规则
        addCateFormRules:{
          cat_name:[
            {
              required:true,
              message:'请输入分类名称',
              trigger:'blur'
            },
            {
              min:4,
              max:10,
              message:'长度在4-10个字符',
              trigger:'blur'
            }
          ]
        },
        //父级分类的列表
        parentCateList:[],
        cascaderProps:{
          value:'cat_id',
          label:'cat_name',
          children:'children'
        },//指定的级联选择器的配置对象
        selectedKeys:[],//选中的父级分类的id数组
        editCateDialogVisbel:false,//控制编辑分类展示
        editCate:{},//编辑内容保存
        editCateRules:{
          cat_name:[
            {
              required:true,
              message:'请输入要修改的商品分类名称'
              ,trigger:'blur'
            },
            {
              min:3,
              max:10,
              message:'字符长度在3-10之间',
              trigger:'blur'
            }
          ]
        },//校验规则
        editCateId: ''
      }
    },
    methods: {
      getCateList(){
        request({
          url:'/categories',
          params:this.queryInfo
        }).then(res=>{
          this.cateList=res.data.result
          this.total=res.data.total
          // console.log(res.data)
        })
      },
      //监听pagesize改变事件
      handleSizeChange(newSize){
        this.queryInfo.pagesize=newSize
        this.getCateList()
      },
      //监听Pagenum的改变
      handleCurrentChange(newPage){
        this.queryInfo.pagenum=newPage
        this.getCateList()
      },
      showAddCateDialog(){
        this.getParentCateList()
        this.addCateDialogVisible=true
      },//监听分类对话框
      getParentCateList(){
        request({
          url:'/categories',
          params:{
            type:this.queryInfo.type
          }
        }).then(res=>{
          this.parentCateList=res.data
          // console.log(this.parentCateList)
        })
      },//获取父级分类的数据列表
      parentCateChanged(){
        // console.log(this.selectedKeys)
          // 如果 selectdKeys 数组中的length大于0证明选中父级分类
          // 反之,就说明没有选中任何父级分类
        if(this.selectedKeys.length>0){
          this.addCateForm.cat_pid=this.selectedKeys[this.selectedKeys.length-1]
          //为当前分类的等级赋值
          this.addCateForm.cat_level=this.selectedKeys.length
          return 
        }else{
          this.addCateForm.cat_pid=0
          this.addCateForm.cat_level=0
        }
      },//选中发生变化触发
      addCate(){
        // console.log(this.addCateForm)
        // console.log(this.selectedKeys)
        this.$refs.addCateFormRef.validate(valid=>{
          if(!valid){
            return this.$message.error('添加失败!')
          }
          request({
            url:'/categories',
            method:'post',
            data:{
              cat_name:this.addCateForm.cat_name,
              cat_pid:this.addCateForm.cat_pid,
              cat_level:this.addCateForm.cat_level
            }
          }).then(res=>{
            // console.log(res.meta.status)
            this.getCateList()
            this.addCateDialogVisible=false  
            return this.$message.success('添加商品分类成功!')
          })
        })
      },
      //表单重置
      addCateDialogClosed(){
        this.$refs.addCateFormRef.resetFields()
        this.selectedKeys=[]
        this.addCateForm.cat_level=0
        this.addCateForm.cat_pid=0
        // console.log(this.addCateForm)
        // alert('1111')
      },//控制修改对话框的显示
      showeditCateDialog(cateInfo){
        this.editCateId=cateInfo.cat_id
        request({
          url:'/categories/'+cateInfo.cat_id
        }).then(res=>{
          this.editCate=res.data
        })
        this.editCateDialogVisbel=true

      },
      //编辑商品分类
      editCateInfo(){
        this.$refs.editCateRef.validate(valid=>{
          if(!valid){
            return this.$message.error('修改商品信息失败')
          }
          request({
            url:'/categories/'+this.editCate.cat_id,
            method:'put',
            data:{
              cat_name:this.editCate.cat_name
            }
          }).then(res=>{
            this.getCateList()
            this.editCateDialogVisbel=false
            return this.$message.success('修改商品信息成功!')
          })
        })
      },
      //删除商品分类
      async removeCate(id){
        const confirmResult=await this.$confirm('此操作将永久删除该文件, 是否继续?', '删除分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除操作!')
        }
        request({
          url:'/categories/'+id,
          method:'delete'
        }).then(res=>{
          this.getCateList()
          return this.$message.success('删除商品分类成功!')
        })
      }
    },
    created() {
      this.getCateList()
    },
  }
</script>

<style>
  .el-card{
    margin-top:15px;
    /* margin-bottom:15px; */
  }
  .tree-table{
    margin-top:15px;
  }
  .el-pagination{
    margin-top:15px;
  }
</style>