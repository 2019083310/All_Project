import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login.vue')
const Home = () => import('../views/home/Home.vue')
const Welcome = () => import('../views/home/children/welcome/Welcome.vue')

const Users = () => import('../views/home/children/users/Users.vue')
const Order = () => import('../views/home/children/order/Order.vue')
const Report = () => import('../views/home/children/report/Report.vue')

const Rights = () => import('../views/home/children/power/rights/Rights.vue')
const Roles = () => import('../views/home/children/power/roles/Roles.vue')

const GoodsList = () => import('../views/home/children/goods/list/List.vue')
const Add = () => import('../views/home/children/goods/list/children/Add.vue')

const Cate = () => import('../views/home/children/goods/cate/Cate.vue')
const Params = () => import('../views/home/children/goods/params/Params.vue')

// 重写路由push方法,阻止重复点击报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 重写路由replace方法,阻止重复点击报错
const originalReplace =VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

Vue.use(VueRouter)


const routes = [{
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Cate
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/goods',
        component: GoodsList
      },
      {
        path: '/goods/add',
        component: Add
      },
      {
        path: '/orders',
        component: Order
      },
      {
        path: '/reports',
        component: Report
      }
    ]
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }else{
    next()
  }

})
export default router