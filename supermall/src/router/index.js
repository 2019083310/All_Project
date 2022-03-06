import Vue from 'vue'
import Router from 'vue-router'

// 重写路由push方法,阻止重复点击报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 重写路由replace方法,阻止重复点击报错
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

// 正常路由加载,会将所有路由的js跟css合并到一个文件
import Home from "../views/home/Home";
import Category from "../views/category/Category";
import Cart from "../views/cart/Cart";
import Profile from "../views/profile/Profile";
import Detail from "../views/Detail/Detail";

Vue.use(Router)

// 路由配置
const routes = [
  {path:'/',redirect:'/home'},
  { path: "/home", name: "home", component: Home },
  { path: "/category", name: "category", component: Category },
  { path: "/cart", name: "cart", component: Cart },
  { path: "/profile", name: "profile", component: Profile },
  { path: "/detail/:id", name: "detail", component: Detail },
  { path: "*", redirect: "/" }
];

export default new Router({
  routes,
  mode:'history'
})
