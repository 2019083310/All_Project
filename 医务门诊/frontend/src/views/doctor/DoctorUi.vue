<template>
  <el-container class="home-contain">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../../assets/images/favicon.jpg" alt="" />
        <span>民大发热门诊医生服务平台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="0" @click="swPath(activePath[0])">
            <i class="el-icon-magic-stick"></i>
            <span>个人中心</span>
          </el-menu-item>
          <el-menu-item index="1" @click="swPath(activePath[1])">
            <i class="el-icon-menu"></i>
            <span>病人挂号信息</span>
          </el-menu-item>
          <el-menu-item index="2" @click="swPath(activePath[2])">
            <i class="el-icon-attract"></i>
            <span>问诊记录</span>
          </el-menu-item>
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
export default {
  name: "DoctorUi",
  data() {
    return {
      activePath: ["/personCenter", "/userReg", "/doctorReg"],
    };
  },
  methods: {
    swPath(path) {
      this.$router.push(path);
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.home-contain {
  height: 720px;
}

.home-contain .el-header {
  display: flex;
  justify-content: space-between;
  background-color: #373d3f;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}

.home-contain .el-header div {
  display: flex;
  align-items: center;
}

.home-contain .el-header div img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

 .home-contain .el-header div span {
  margin-left: 15px;
}

.home-contain .el-aside {
  background-color: #333744;
}

.home-contain .el-aside .el-menu {
  border-right: none;
  background-color: #333744;
}

.home-contain .el-main {
  background-color: #eaedf1;
}
</style>