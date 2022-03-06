<template>
  <div class='avator_box'>
    <!-- 头像区域 -->
    <img src="../../../assets/img/logo.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'Logo'
  }
</script>

<style>
  .avator_box{
    position: absolute;
    left:50%;
    transform: translate(-50%,-50%);
    padding:10px;
    width: 130px;
    height: 130px;
    border:1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px rgb(31, 30, 30);
    background-color: rgb(255, 255, 255);
  }
  .avator_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
</style>