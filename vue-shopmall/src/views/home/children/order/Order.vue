<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item></el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span='8'>
          <el-input placeholder="请输入内容" clearable v-model='queryInfo.query' @clear='getOrderList'>
            <el-button icon='el-icon-search' slot='append' @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table border stripe :data='orderList'>
        <el-table-column type='index' label='#'></el-table-column>
        <el-table-column label='订单编号' prop='order_number'></el-table-column>
        <el-table-column label='订单价格' prop='order_price'></el-table-column>
        <el-table-column label='是否支付'>
          <template slot-scope="scope">
            <el-tag type='danger' v-if='scope.row.pay_status==="0"'>未付款</el-tag>
            <el-tag type='success' v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label='是否发货' prop='is_send'></el-table-column>
        <el-table-column label='下单时间'>
          <template slot-scope="scope">
            {{scope.row.create_time | dataFormat}}
          </template>
        </el-table-column>
        <el-table-column label='操作'>
          <template slot-scope="scope">
            <el-tooltip class='item' content='修改地址' placement='top' effect='dark'>
              <el-button type='primary' icon='el-icon-edit' circle @click='showBox'></el-button>
            </el-tooltip>
            <el-tooltip class='item' content='物流状态' placement='top' effect='dark'>
              <!-- <pre>{{scope.row}}</pre> -->
              <el-button type='success' icon='el-icon-location' circle @click="showProgressBox"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 9, 11, 15]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total"
        >
      </el-pagination>
    </el-card>
    <!--    修改地址的对话框-->
    <el-dialog title="修改地址" :visible.sync="addressDialogVisible" @close="addressDialogClosed" width="50%">
      <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader :options="cityData" v-model="addressForm.address1" :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--    显示物流进度的对话框-->
    <el-dialog title="物流进度" :visible.sync="progressDialogVisible" width="50%">
      <el-timeline :reverse="false">
        <el-timeline-item v-for="(activity, index) in progressInfo" :key="index" :timestamp="activity.ftime">
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
  import cityData from './citydata'
  import {request} from '../../../../network/request'
  export default {
    name: 'Order',
    data(){
      return {
        queryInfo:{
          query:'',
          pagenum:1,
          pagesize:5
        },
        orderList:[],
        total:0,
        addressDialogVisible:false,
        addressForm:{
          address1:[],
          address:''
        },
        addressFormRules:{
          address1: [{ required: true, message: '请选择省市区/县', trigger: 'blur' }],
          address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
        },
        cityData,//地址的选择
        // 显示物流进度的
        progressDialogVisible: false,
        progressInfo: []
      }
    },
    methods: {
      getOrderList(){
        request({
          url:'/orders',
          params:this.queryInfo
        }).then(res=>{
          this.orderList=res.data.goods
          this.total=res.data.total
        })
      },
      handleSizeChange(newPagsize){
        this.queryInfo.pagesize=newPagsize
        this.getOrderList()
      },
      handleCurrentChange(newPagenum){
        this.queryInfo.pagenum=newPagenum
        this.getOrderList()
      },
       // 展示修改对话框
      showBox() {
        this.addressDialogVisible = true
      },
      addressDialogClosed(){
        this.$refs.addressFormRef.resetFields()
      },
      showProgressBox() {
        // request({
        //   url:'/kuaidi/1106975712662'
        // }).then(res=>{
        //   this.progressInfo=res.data
        //   this.progressDialogVisible=true
        //   console.log(this.progressInfo)
        // })
        this.progressDialogVisible=true
        this.progressInfo = [
         {
           time: '2018-05-10 09:39:00',
           ftime: '2018-05-10 09:39:00',
           context: '已签收,感谢使用顺丰,期待再次为您服务',
           location: ''
         },
         {
           time: '2018-05-10 08:23:00',
           ftime: '2018-05-10 08:23:00',
           context: '[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件',
           location: ''
         },
         {
           time: '2018-05-10 07:32:00',
           ftime: '2018-05-10 07:32:00',
           context: '快件到达 [北京海淀育新小区营业点]',
           location: ''
         },
         {
          time: '2018-05-10 02:03:00',
          ftime: '2018-05-10 02:03:00',
          context: '快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]',
          location: ''
        },
        {
          time: '2018-05-09 23:05:00',
          ftime: '2018-05-09 23:05:00',
          context: '快件到达 [北京顺义集散中心]',
          location: ''
        },
        {
          time: '2018-05-09 21:21:00',
          ftime: '2018-05-09 21:21:00',
          context: '快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]',
          location: ''
        },
        {
          time: '2018-05-09 13:07:00',
          ftime: '2018-05-09 13:07:00',
          context: '顺丰速运 已收取快件',
          location: ''
        },
        {
          time: '2018-05-09 12:25:03',
          ftime: '2018-05-09 12:25:03',
          context: '卖家发货',
          location: ''
        },
        {
          time: '2018-05-09 12:22:24',
          ftime: '2018-05-09 12:22:24',
          context: '您的订单将由HLA（北京海淀区清河中街店）门店安排发货。',
          location: ''
        },
        {
          time: '2018-05-08 21:36:04',
          ftime: '2018-05-08 21:36:04',
          context: '商品已经下单',
          location: ''
        }
      ]
      
      }
    },
    created() {
      this.getOrderList()
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
  .el-cascader{
    width:100%;
  }
</style>