<template>
  <div id='home'>
    <nav-bar class='home-nav'>
      <div slot='center'>购物街</div>
    </nav-bar>
    <scroll class='scroll-height' ref='scroll' :probe-type="3" @scroll='contentScroll' @pullingUp='loadmore' :pull-up-load="true">
      <home-swiper :banners="banners"></home-swiper>
      <recommand :recommends='recommends'></recommand>
      <feature></feature>
      <tab-control @tabClick='tabClick' class='tab-control'></tab-control>
      <goods-list :goods='goods[currentType].list'></goods-list>
    </scroll>
    <!-- 组件不能直接@click，需要加.native修饰符 -->
    <back-top @click.native='backClick' v-show='isShowBackTop'></back-top>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import TabControl from '../../components/content/tabcontrol/TabControl.vue'
  import BackTop from '../../components/content/backtop/BackTop.vue'

  import HomeSwiper from './children/HomeSwiper.vue'
  import Recommand from './children/Recommand.vue'
  import Feature from './children/Feature.vue'
  import GoodsList from '../../components/content/goods/GoodsList.vue'

  import Scroll from '../../components/common/scroll/Scroll.vue'

  import {
    getHomeMulidata,
    getHomeGoodsData
  } from '../../network/home'
  export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        currentType: 'pop',
        isShowBackTop:false,
        saveY:0
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      Recommand,
      Feature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
      getHomeGoodsData(type) {
        const page = this.goods[type].page + 1;
        getHomeGoodsData(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      },
      getHomeMulidata() {
        getHomeMulidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
          default:
            break
        }
      },
      backClick(){
        console.log('backClick')
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        // console.log(position)
        this.isShowBackTop=-(position.y)>1000
      },
      loadmore(){
        this.getHomeGoodsData(this.currentType)
      }
    },
    created() {
      this.getHomeMulidata()
      this.getHomeGoodsData('pop')
      this.getHomeGoodsData('new')
      this.getHomeGoodsData('sell')
    },
    mounted() {
      //监听item中的图片加载完成
      this.$bus.$on('itemImageLoad',()=>{
        this.$refs.scroll.refresh()
      })
    },
  }

</script>

<style>
   #home {
    /* 因为导航栏脱离标准流， */
    padding-top: 44px;
    position: relative;
  }

  .home-nav {
    /* 通过base.css中党的变量设置颜色 */
    background-color: var(--color-tint);
    color: #fff;

    /* 设置导航栏往下翻时依旧在顶端 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 43px;
    z-index: 9;
    background-color: white;
  }

  .scroll-height {
    height: calc(100vh - 93px);
    /* overflow: hidden; */

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
