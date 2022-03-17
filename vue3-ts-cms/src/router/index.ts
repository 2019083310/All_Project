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
    if(to.path==='/main'){
      return firstRoute?.path
    }
  }


})

export default router
