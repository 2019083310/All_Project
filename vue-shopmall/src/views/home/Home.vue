<template>
  <el-container class='home-container'>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../../assets/img/hai.jpg" alt="">
        <span>电商管理后台系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'61px':'200px'">
        <div class="toggle-button" @click='toggleCollpase'>|||</div>
        <el-menu :default-active="activePath" text-color="#fff" active-text-color="#409EFF" background-color='#333744'
          :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" :router='true'>
          <!-- 一级菜单 -->
          <el-submenu :index='item.id+""' v-for='(item,index) in menulist' :key='item.id'>
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index='"/"+subItem.path' v-for='subItem in item.children' :key='subItem.id'
              @click="saveActivePath('/' + subItem.path)">
              <template>
                <i class='el-icon-menu'></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {
    getMenuList
  } from '../../network/home'
  export default {
    name: "Home",
    data() {
      return {
        //左侧菜单数据
        menulist: [],
        iconsObj: {
          // 一级菜单的icon图标
          147: 'el-icon-magic-stick',
          125: 'iconfont icon-users',
          103: 'iconfont icon-tijikongjian',
          101: 'iconfont icon-shangpin',
          102: 'iconfont icon-danju',
          145: 'iconfont icon-baobiao'
        },
        isCollapse: false, //是否折叠属性
        activePath: '',
        welcome: {
          authName: '欢迎光临',
          id: 147,
          order: 1,
          path: '/welcome',
          children: [{
            authName: 'Welcome',
            id: 124,
            order: 1,
            path: 'welcome',
            children: []
          }]
        }
      }
    },
    methods: {
      logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      getMenuList() {
        getMenuList().then(res => {
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg)
          }
          this.$message.success(res.meta.msg)
          this.menulist = res.data
          this.menulist.unshift(this.welcome)
          // console.log(res.data)
        })
      },
      //点击按钮，切换菜单的折叠和展开
      toggleCollpase() {
        this.isCollapse = !this.isCollapse
      },
      saveActivePath(activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
        // console.log(this.$route.path)
      }
    },
    created() {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
    }
  }
</script>

<style>
  .home-container {
    height: 100%;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    background-color: #373d3f;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }

  .el-header div {
    display: flex;
    align-items: center;
  }

  .el-header div img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .el-header div span {
    margin-left: 15px;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-aside .el-menu {
    border-right: none;
    background-color: #333744;
  }

  .el-main {
    background-color: #eaedf1;
  }

  .iconfont {
    padding-right: 10px;
  }

  .toggle-button {
    background: #4a5064;
    font-size: 10px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>