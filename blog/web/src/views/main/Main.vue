<template>
  <div class='main'>
    <Header></Header>
    <Canvas></Canvas>
    <router-view style="min-height:800px"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../../components/common/head/Header.vue'
  import Canvas from '../../components/common/canvas/Canvas.vue'
  import Footer from '../../components/common/footer/Footer.vue'
  export default {
    name: 'Main',
    components:{
      Header,
      Canvas,
      Footer
    }
  }
</script>

<style>

</style>