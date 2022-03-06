<template>
  <header class='head'>
    <div class="hand">
      <router-link to="/" tag='div'>
        <img src="../../../assets/img/header/LOGO2.png" alt="" height='42' class='main-img'>
      </router-link>
    </div>
    <div class='d-flex hand text-white'>
      <router-link :to="item.link" tag="div" v-for='(item,index) in items' :key='item.text' class='nav-item'>
        {{item.text}}
      </router-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    data(){
      return {
        items:[
          {text:'首页',link:'/' },
          {text:'归档',link:'/archives'},
          {text:'标签',link:'/tags'},
          {text:'友链',link:'/link'},
          {text:'留言',link:'/message'},
          {text:'关于',link:'/about'}
        ]
      }
    }
  }
</script>

<style>

</style>