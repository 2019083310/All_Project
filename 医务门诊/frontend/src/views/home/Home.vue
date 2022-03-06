<template>
  <div id='home'>
    <div id="hd">
      <h1>民大发热门诊挂号服务平台</h1>
      <h2>您的健康顾问</h2>
    </div>
    <el-row>
      <el-col :span="6">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#eee"
          text-color="black"
          active-text-color="blue"
        >
          <h2>网上便捷挂号</h2>
          <el-menu-item :index="'/'+routePath[0]" @click='switchPage(routePath[0])'>
            <i class="el-icon-thumb"></i>
            <span >网上便捷预约挂号首页</span>
          </el-menu-item>
          <el-menu-item :index="'/'+routePath[1]" @click='switchPage(routePath[1])'>
            <i class="el-icon-menu"></i>
            <span slot="title">新闻通知</span>
          </el-menu-item>
          <el-menu-item :index="'/'+routePath[2]" @click='switchPage(routePath[2])'>
            <i class="el-icon-document"></i>
            <span slot="title">接诊历史记录查询</span>
          </el-menu-item>
          <el-menu-item :index="'/'+routePath[3]" @click='switchPage(routePath[3])'>
            <i class="el-icon-edit"></i>
            <span slot="title">预约历史查询(退号)</span>
          </el-menu-item>
          <el-menu-item :index="'/'+routePath[4]" @click='switchPage(routePath[4])'>
            <i class="el-icon-user"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
          <el-menu-item :index="'/'+routePath[5]" @click='logout'>
            <i class="el-icon-caret-left"></i>
            <span slot="title">退出系统</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <div id='content'>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      routePath:[
        '/reg','/news','/findMessage','/cancelReg','/person','/logout'
      ]
    }
  },
  methods: {
    switchPage(index){
      this.$router.push(index)
    },
    logout(){
      const result=confirm('确认退出当前账号？')
      if(result){
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
    }
  },
};
</script>

<style>
#home{
  background-color: rgb(114, 134, 134);
  opacity: 0.5;
  height: 721px;
}
#hd {
  height: 100px;
  border-bottom: 2px solid #fff;
}

#hd h1 {
  color: rgb(208, 228, 27);
  display: inline-block;
  margin-left: 300px;
}
#hd h2 {
  margin-left: 300px;
  display: inline-block;
  color: rgb(124, 233, 22);
}
.el-row{
  display: inline-block;
}
.el-menu{
  width: 300px;
  height: 300px;
  margin-top:80px;
  margin-left:300px;
}
.el-menu h2{
  width: 200px;
  line-height:50px;
  text-align: center;
  margin:10px auto;
  color:rgb(20, 20, 20);
  border-bottom: 2px solid rgb(245, 228, 228);
}
#content{
  width: 800px;
  height: 500px;
  position: absolute;
  top:180px;
  left:650px;
  /* border:1px solid #fff; */
}
</style>