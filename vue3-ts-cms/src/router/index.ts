import {createRouter,createWebHistory} from 'vue-router'
import {firstRoute} from '../utils/mapRouter'

const routes=[
  {
    path:'/',
    redirect:'/main'
  },
  {
    path:'/login',
    name:"login",
    component:()=>import('../views/login/Login.vue')
  },
  {
    path:'/main',
    name:"main",
    component:()=>import('../views/main/Main.vue')
  },
  {
    path:'/:pathMatch(.*)*',
    name:'notFound',
    component:()=>import('../views/NotFound/NotFound.vue')
  }
]

const router=createRouter({
  routes,
  history:createWebHistory()
})

router.beforeEach((to,from)=>{
  if(to.path!=='/login'){
    const token=window.localStorage.getItem('token')
    if(!token){
      return '/login'
    }

    // 还要解决一个问题，当我们重定向到/main,main中的内容也是需要重定向的
    if(to.path==='/main'){
      return firstRoute?.path
    }
  }

  // 这个打印就可以看出如果先执行use(router)那么，我们的路径是匹配不到的
  // 最后匹配到notFound这个路由对象
  // console.log(router.getRoutes())
  // console.log(to)
})

export default router
