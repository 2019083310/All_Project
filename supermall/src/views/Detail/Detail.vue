<template>
  <div>
    <detail-nav-bar @titleItemClick='titleItemClick' ref='detailNavBar'></detail-nav-bar>
    <scroll ref='scroll' :probeType="3" class='scroll-height' @scroll="detailScroll">
      <detail-swiper :top-images="topImages" class='detail-set-scroll'></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo' @load="imgLoad"></detail-goods-info>
      <detail-param-info :param-info='paramInfo' class='detail-set-scroll'></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" class='detail-set-scroll'></detail-comment-info>
      <goods-list :goods='recommendList' class='detail-set-scroll'></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from './children/DetailNavBar.vue'
  import DetailSwiper from './children/DetailSwiper.vue'
  import DetailBaseInfo from './children/DetailBaseInfo.vue'
  import DetailGoodsInfo from './children/DetailGoodsInfo.vue'
  import DetailShopInfo from './children/DetailShopInfo.vue'
  import DetailParamInfo from './children/DetailParamInfo.vue'
  import DetailCommentInfo from './children/DetailCommentInfo.vue'
  import DetailBottomBar from './children/DetailBottomBar.vue'
  // import DetailImagesInfo from './children/DetailImagesInfo.vue'

  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam,
    getRecommend
  } from '../../network/detail'

  import GoodsList from '../../components/content/goods/GoodsList.vue'

  import Scroll from '../../components/common/scroll/Scroll.vue'
  export default {
    name: 'Detail',
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailGoodsInfo,
      DetailShopInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      // DetailImagesInfo,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        detailClassList: [],
        detailIndex: 0
      }
    },
    created() {
      //1.保存传入的id
      this.iid = this.$route.params.id;
      // console.log(this.$route)
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule || {})
        // 6.获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
      })
      getRecommend().then(res => {
        this.recommendList = res.data.list
      })
    },
    methods: {
       imgLoad(){
        this.$ref.scroll.refresh()
        this.getClassList()
      },
       titleItemClick(index) {
        // 根据数组下标滚动到对应的元素内容位置
        this.$nextTick(() => {
          let el = document.getElementsByClassName('detail-set-scroll')
          this.$refs.scroll.scrollToElement(el[index], 300)
          // console.log(this.$route)
        })
      },
      // 获取classList
      getClassList() {
        // Array.from() 将伪数组转换成纯数组
        // this.detailClassList = [];
        this.detailClassList = Array.from(document.getElementsByClassName("detail-set-scroll"));
        let maxValue = 1000;
        this.detailClassList.push({
          offsetTop: maxValue
        });
        // console.log(this.detailClassList);
      },
      // 监听详情页滚动事件,并动态设置navBar的index
      detailScroll(position) {
        let detailPosition = position ? -position.y : 0
        this.curPosition = detailPosition
        for (let i = 0; i < this.detailClassList.length - 1; i++) {
          if (
            this.curPosition >= this.detailClassList[i].offsetTop &&
            this.curPosition < this.detailClassList[i + 1].offsetTop
          ) {
            if (this.detailIndex !== i) {
              this.detailIndex = i;
              this.$refs.detailNavBar.currentIndex = this.detailIndex;
            }
            break;
          }
        }
      },
       // 添加购物车
      addToCart() {
        // 1.获取需要展示到购物车的商品信息
        const obj = {
          image: this.topImages[0],
          title: this.goods.title,
          desc: this.goods.desc,
          price: this.goods.oldPrice,
          id: this.iid
        };

        // 2.将商品数据传到购物车页面
        this.$store.dispatch("setCateGoryData", obj);
      },
    },
  }

</script>

<style>
  /* BScroll固定高度和区域 */
  .scroll-height {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 50px;
    left: 0;
    overflow: hidden;
    width: 100%;
    background-color: #ffffff;
  }

</style>
