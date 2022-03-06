<template>
  <div class='welcome'>
    <div class="logo">
      <h2>Welcome</h2>
      <h2>欢迎来到电商平台管理系统</h2>
      <h3>关于前端的一些帮助</h3>
    </div>
    <div class='content'>
      <ul class='menu'>
        <li><a href="https://blog.csdn.net/weixin_50903927?spm=1000.2115.3001.5343">博客</a>
          <span>--CSDN博客 在学习时写的一些笔记,会不定期更新前端的重要知识点</span>
        </li>
        <li><a href="https://github.com/2019083310">GITHUB</a><span>--GITHUB项目文件存放的地方--国外</span></li>
        <li><a href="https://gitee.com/liumoumou1">GItte</a><span>--Gitte项目文件存放的地方--国内</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Welcome',
  }
</script>

<style>
  .logo {
    width: 500px;
    margin: 50px auto;
    color: orange;
    text-align: center;
  }

  .content {
    width: 700px;
    margin: 0 auto;
  }

  .content .menu li {
    list-style: none;
    margin-top: 10px;
  }

  .content .menu li a {
    display: inline-block;
    text-decoration: none;
    font-size: 20px;
    margin-right: 10px;
  }

  .content .menu li span {
    font-size: 20px;
  }
</style>