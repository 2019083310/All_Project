<template>
  <div class='goods'>
    <goods-item-list v-for='(item,index) in goods' :key='index' :goods-item='item'></goods-item-list>
  </div>
</template>

<script>
  import GoodsItemList from './GoodsItemList.vue'
  export default {
    name: 'GoodsList',
    components: {
      GoodsItemList
    },
    props: {
      goods: {
        type: Array,
        default () {
          return []
        }
      },
      // goodsHeight: {
      //   type: Boolean,
      //   default: true
      // }
    }
  }

</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 3px;
  }

</style>
