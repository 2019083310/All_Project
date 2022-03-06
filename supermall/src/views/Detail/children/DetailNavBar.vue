<template>
  <div>
    <nav-bar>
      <div slot='left' class='back' @click='backClick'>
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot='center' class='title'>
        <div v-for='(item,index) in titles' :class='{active:currentIndex===index}' class='title-item'
          @click='titleClick(index)' :key='index'>
          <span @click='titleItemClick(index)'>{{item}}</span>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '../../../components/common/navbar/NavBar.vue'
  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      titleClick(index) {
        this.currentIndex = index
      },
      titleItemClick(index){
        this.$emit('titleItemClick',index)
      }
    },
  }

</script>

<style>
  .title {
    display: flex;
    text-align: center;
    font-size: 13px;
  }
  .title-item{
    flex:1;
  }
  .active {
    color: rgb(250, 111, 134);
  }
  .back img{
    margin-top:12px;
  }
</style>
