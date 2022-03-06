import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载
const Main=()=>import('../views/main/Main.vue')
const About=()=>import('../views/about/About.vue')
const Home=()=>import('../views/home/Home.vue')
const Archive=()=>import('../views/archive/Archive.vue')
const Link=()=>import('../views/link/Link.vue')
const Tags=()=>import('../views/tag/Tags.vue')
const Messages=()=>import('../views/message/Message.vue')
const Article=()=>import('../views/article/Article.vue')

Vue.use(VueRouter)

const routes=[
  {
    path:'*',
    redirect:'/'
  },
  {
    path:'/',
    component:Main,
    children:[
      {
        path:'/',
        name:'Home',
        component:Home,
        meta:{
          title:'首页-酒客'
        }
      },
      {
        path:'/archive',
        name:'Archive',
        component:Archive,
        meta:{
          title:'归档-酒客'
        }
      },
      {
        path:'/tags',
        name:"Tag",
        component:Tags,
        meta:{
          title:'标签-酒客'
        }
      },
      {
        path:'/link',
        name:'Link',
        component:Link,
        meta:{
          title:'友链-酒客'
        }
      },
      {
        path:'/message',
        name:"留言",
        component:Messages,
        meta:{
          title:'留言-酒客'
        }
      },
      {
        path:'/about',
        name:'About',
        component:About,
        meta:{
          title:'关于-酒客'
        }
      },
      {
        path:'/article',
        name:'Article',
        component:Article,
        meta:{
          title:'文章详情-酒客'
        }
      }
    ]
  },
]

const router =new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  next()
})
export default router