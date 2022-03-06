<template>
  <div class='foot'>
    <div class="foot-top">
      <div class="foot-top-wrapper">
        <div class="foot-top-item">
          <a href="https://github.com/2019083310" target='_blank' class='text-grey-1'>GITHUB</a>
        </div>
        <div class="foot-top-item">
          <a href="https://www.zhihu.com/people/bu-yu-qing-chang-16-97" target='_blank' class='text-grey-1'>ZHIHU</a>
        </div>
        <div class="foot-top-item">
          <a href="https://www.weibo.com/" target='_blank' class='text-grey-1'>WEIBO</a>
        </div>
        <div class="foot-top-item">
          <a href="/" class='text-grey-1'>TWITTER</a>
        </div>
      </div>
    </div>
    <div class='foot-center'>
      <div class='foot-center-wrapper'>
          <router-link to="/" tag="div" class='link'>
            <img src="../../../assets/img/header/LOGO2.png" alt="">
          </router-link>
          <div>
            <p>I work with passion & love.</p>
            <p>
              The Site is Powered by
              <a href="https://github.com/2019083310" target="_blank">酒客</a>
            </p>
            <!-- <p>
              本博客已运行{{ this.timeObj.day }}天{{ this.timeObj.hour }}时{{
              this.timeObj.minute
              }}分{{ this.timeObj.second }}秒
            </p> -->
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style scoped>
  .foot {
    width: 100%;
    bottom: 0;
    left: 0;
    background-color:grey;
  }
  a{
    text-decoration: none;
    color:black;
  }
  .foot-top{
    width: 100%;
    height: 61px;
    border-bottom:1px solid rgb(122, 115, 115);
  }
  .foot-top-wrapper{
    width:300px ;
    margin:0 auto;
    display: flex;
  }
  .foot-top-item{
    flex:1;
    text-align: center;
    line-height:61px;
  }
  .foot-center{
    width: 100%;
    height: 178px;
    margin-top:20px;
  }
  .foot-center-wrapper{
    width: 300px;
    height: 178px;
    margin:0 auto;
  }
  .foot-center-wrapper .link img{
    height: 50px;
    width: 100px;
  }
</style>