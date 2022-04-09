<template>
  <div class="category" >
    <nav-bar class='category-navbar'>
      <div slot='center'>商品分类</div>
    </nav-bar>
    <slide-bar :slide-bar-list="categoryList" @slideBarItemClick='slideBarItemClick'></slide-bar>
    <scroll class="scroll-height">
      <sub-category :category-list='subcategoryList'></sub-category>
      <tab-bar-control @tabClick='tabClick' ref='tabControl'></tab-bar-control>
      <goods-list :goods='categoryDetailList'></goods-list>
    </scroll>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import TabBarControl from '../../components/content/tabcontrol/TabControl.vue'
  import Scroll from '../../components/common/scroll/Scroll.vue'

  import SlideBar from './children/SlideBar.vue'
  import SubCategory from './children/SubCategory.vue'

  import GoodsList from '../../components/content/goods/GoodsList.vue'

  import {
    getCategory,
    getSubcategory,
    getCategoryDetail
  } from '../../network/category'
  export default {
    name: 'Category',
    components: {
      NavBar,
      TabBarControl,
      GoodsList,
      SlideBar,
      SubCategory,
      Scroll
    },
    data() {
      return {
        //侧边栏数据
        categoryList: [],
        // titles: ['流行', '新款', '精选'],
        currentIndex: 0,
        //内容数据
        categoryDetailList: [],
        subcategoryList: [],
      }
    },
    methods: {
      getCategory() {
        getCategory().then(res => {
          // console.log(res.data.category.list);
          this.categoryList = res.data.category.list
          this.$nextTick(()=>{
            this.getSubcategory(this.categoryList[0].maitKey)
            this.getCategoryDetail(this.categoryList[0].miniWallkey,'pop')
          })
        })
      },
      getSubcategory(key) {
        getSubcategory(key).then(res => {
          this.subcategoryList = [...res.data.list]
        })
      },
      getCategoryDetail(key, type) {
        getCategoryDetail(key, type).then(res => {
          this.categoryDetailList = [...res]
        })
      },
      slideBarItemClick({
        maitKey,
        index
      }) {
        //反之反复请求
        if (this.currentIndex === index) {
          return;
        }
        this.currentIndex = index
        // 每次切换分类初始化tabControl的下标
        //请求对应的推荐列表
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "pop");
        this.getSubcategory(maitKey);
      },
      tabClick(index) {
        const typeList = ['pop', 'new', 'sell']
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[index])
      }
    },
    created() {
      this.getCategory()
    },
    activated() {
      this.$store.commit('setLoading', true)
    },
  }

</script>

<style scoped>
  .category-nav-bar {
    font-weight: 600;
    color: white;
    background-color: #ff8198;
  }

  .scroll-height {
    position: fixed;
    top: 44px;
    right: 0;
    bottom: 50px;
    left: 100px;
    overflow: hidden;
  }

</style>
