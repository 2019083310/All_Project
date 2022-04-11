<template>
  <div class='goods-item' @click='itemClick'>
    <!-- <img :src="showImage" alt="" @load="imageLoad"> -->
    <!-- 图片懒加载 -->
    <img v-lazy='showImage' alt="">
    <div class='goods-info'>
      <p>{{goodsItem.title}}</p>
      <span class='price'>{{goodsItem.price}}</span>
      <span class='collect'>{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsItemList',
    props: {
      goodsItem: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      imageLoad(){
        this.$bus.$emit('itemImageLoad')
      },
      itemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.img||this.goodsItem.image||this.goodsItem.show.img
      }
    }
  }

</script>

<style scoped>
  .goods-item {
    padding-bottom: 10px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 14px;
    overflow: hidden;
    margin-top: 4px;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    margin-bottom: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .goods-info .price {
    margin-right: 30px;
    color: #ff5777;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    position: absolute;
    top: 2px;
    left: -16px;
    width: 14px;
    height: 14px;
    content: "";
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
