<template>
  <div class='tab-control'>
    <div v-for='(item,index) in titles' :key='index' class='tab-control-item' @click='itemClick(index)' :class='{active:index===currentIndex}'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'TabControl',
    data(){
      return {
        titles:['流行','新款','精选'],
        currentIndex:0
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex=index;
        this.$emit('tabClick',index)
      }
    },
  }

</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size:15px;
  }
  .tab-control-item{
    flex:1;
  }
  .active{
    color:rgb(233, 14, 50);
  }
  .active span{
    border-bottom: 3px solid rgb(221, 55, 83);
  }
</style>
