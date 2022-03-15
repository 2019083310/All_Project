import {createRouter,createWebHistory} from 'vue-router'

const routes=[
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:()=>import('../views/login/Login.vue')
  },
  {
    path:'/home',
    component:()=>import('../views/home/Home.vue')
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
  }
})

export default router
