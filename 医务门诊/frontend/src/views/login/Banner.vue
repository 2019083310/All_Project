<template>
  <div>
    <div id="tab">
      <img src="../../assets/images/logo.png" alt="" />
      <span class='ziti'>大连民族大学发热门诊挂号平台</span>
      <div id='btn'>
        <el-button type="primary" @click='login'>登录</el-button>
        <el-button type="info" @click='register'>注册</el-button>
      </div>
    </div>
    <div id="main">
      <div class='left'>
        <img src="../../assets/images//shouhuan.png" alt="">
      </div>
      <div class="right">
        <div class="wenzi">
          <h1>民大发热门诊挂号服务平台</h1>
          <h2>为民大师生提供实用共享的智慧医疗服务</h2>
        </div>
        <ul>
          <li>新闻资讯</li>
          <li>特色服务</li>
          <li>健康保健</li>
          <li>营养养生</li>
          <li>疾病防治</li>
          <li>便民查询</li>
        </ul>
        <div class="enter">点击进入</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  methods:{
    login(){
      this.$router.push('/login')
    },
    register(){
      this.$router.push('/register')
    }
  }
};
</script>

<style>
#tab { 
  height: 100px;
  background-color: rgb(192, 186, 180);
  border-bottom: 0.1px solid #fff;
}
#tab img {
  width: 200px;
  height: 60px;
  margin-left: 200px;
  margin-top: 20px;
}
.ziti{
  position: absolute;
  font-size: 28px;
  color: #4b607c;
  margin-left:10px;
  margin-top:32px;
}
#btn {
  width: 200px;
  height: 50px;
  position: absolute;
  display: inline-block;
  left:1200px;
  top:30px;
}
#main{
  height: 620px;
  background-color: rgb(85, 188, 236);
  background-image: url('../../assets/images/background.jpg');
}
.left{
  display: inline-block;
  width: 500px;
}
#main .left img{
  margin-left:280px;
  margin-top:20px;
}
.right{
  display: inline-block;
  width: 500px;
  position: absolute;
  margin-left:350px;
  top:200px;
  color:white;
}
.right .wenzi{
  width: 500px;
  display: inline-block;
  position:relative;
  left:0;
  top:0;
  }
.right ul{
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  margin-top:20px;
}
.right ul li{
  width: 100px;
  height: 30px;
  line-height: 30px;
  border:1px solid #fff;
  border-radius: 25px;
  text-align: center;
  background-color: rgb(128, 138, 194);
  margin:5px 10px;
}
.enter{
  width: 200px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border:3px solid white;
  /* background-color: rgb(53, 61, 56); */
  font-size: 25px;
  margin-top:30px;
  margin-left:15px;
}
</style>