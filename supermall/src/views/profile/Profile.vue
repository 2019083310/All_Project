<template>
  <div class='profile'>
    <nav-bar class='nav-bar'><div slot='center'>小洋哥商城</div></nav-bar>
    <login />
    <money />
    <div class='line'></div>
    <profile-list></profile-list>
  </div>
</template>

<script>
  import Login from './children/Login.vue'
  import Money from './children/Money.vue'
  import ProfileList from './children/ProfileList.vue'
  import NavBar from '../../components/common/navbar/NavBar.vue'
  export default {
    name: 'Profile',
    components:{
      Login,
      ProfileList,
      NavBar,
      Money
    }
  }

</script>

<style>
  .profile {
  width: 100%;
  height: 100%;
}

.nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}

/* .scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
} */
</style>
