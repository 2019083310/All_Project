<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter='20'>
        <el-col :span='7'>
          <el-input  placeholder="请输入内容" clearable v-model='queryInfo.query'>
            <el-button slot='append' icon='el-icon-search' @click='getGoodsList'></el-button>
          </el-input>
        </el-col>
        <el-col :span='4'>
          <el-button @click='goAddpage' type='primary'>添加商品</el-button>
        </el-col>
      </el-row>
      <!-- table区域 -->
      <el-row>
        <el-table border stripe :data='goodsList'>
          <el-table-column type='index' label='#'></el-table-column>
          <el-table-column label='商品名称' prop='goods_name'></el-table-column>
          <el-table-column label='价格(元)' prop='goods_price' width='110px'></el-table-column>
          <el-table-column label='商品重量' prop='goods_weight' width="130px"></el-table-column>
          <el-table-column label='创建时间' width="220px" >
            <template slot-scope="scope" >
              {{scope.row.add_time}}
            </template>
          </el-table-column>
          <el-table-column label='操作' width="150px">
            <template slot-scope="scope">
              <el-button icon='el-icon-edit' size='mini' type='primary'></el-button>
              <el-button icon='el-icon-delete' size='mini' type='danger' @click="removeById(scope.row.goods_id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[7, 11, 15, 19]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {request} from '../../../../../network/request'
  export default {
    name: 'List',
    data(){
      return {
        goodsList:[],
        total:0,
        queryInfo:{
          query:'',
          pagenum:1,
          pagesize:7
        }
      }
    },
    created() {
      this.getGoodsList()
    },
    methods: {
      getGoodsList(){
        request({
          url:'/goods',
          params:this.queryInfo
        }).then(res=>{
          this.goodsList=res.data.goods
          this.total=res.data.total
          // console.log(this.goodsList)
          return this.$message.success('获取商品列表成功!')
        })
      },
      // 显示的页数改变
      handleSizeChange(newSize) {
        this.queryInfo.pagesize = newSize
        this.getGoodsList()
      },
      // 页码的改变
      handleCurrentChange(newValue) {
        this.queryInfo.pagenum = newValue
        this.getGoodsList()
      },
      goAddpage(){
        this.$router.push('/goods/add')
      },
      async removeById(id) {
        const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        // console.log(confirmResult)
        if (confirmResult !== 'confirm') {
          return this.$message.info('删除操作已取消!')
        }
        request({
          url:'/goods/'+id,
          method:'delete'
        }).then(res=>{
          this.$message.success('删除成功!')  
          this.getGoodsList()
        })
      },
    },
  }
</script>

<style>
  .el-card{
    margin-top:15px;
  }
  .el-table{
    margin-top:15px;
  }
  .el-pagination{
    margin-top:15px;
  }
</style>