import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// 引入全局适配样式
import 'normalize.css'
import './assets/css/index.less'

// element-plus按需引入
import {registerGlobal} from './global/index'

// 我们的vuex是保存在内存当中的,当我们刷新页面，vuex的内的东西会丢失
import {setupStore} from './store/index'

const app=createApp(App)

// element-plus组件库的按需引入
app.use(registerGlobal)
// element-plus组件库的全局引入
// element-plus的全局引入
// import ElementPlus from 'element-plus'
// 样式
// import 'element-plus/theme-chalk/index.css'
// app.use(ElementPlus)

// 执行vuex的store函数
app.use(store)

// 注意:我们的setupStore()调用必须在use(router)的前面
// 如果在后面，那么use(router)先执行,我们动态加载的路由是没有的，那么匹配不到相应的路由，就会匹配到notFound
// 在跳转的时候，执行路由守卫，就会跳转到notFound

// setupStore()把我们localStorage中的缓存加入到vuex中
// vuex的内容是保存在内存当中的，一刷新页面内存就会丢失，vuex的内容就找不到了
setupStore()

app.use(router)

// 挂载根组件
app.mount('#app')


//这个process.env表示当前运行的环境是development
// 如果是Build则是production
// 原理是通过webpack插件definePlugin集成设置的
//这是因为webpack的设置，我们用cli脚手架创建的项目已经被内置好了
// console.log(process.env)
// console.log(process.env.VUE_APP_BASE_TIME);
// console.log(process.env.VUE_APP_BASE_NAME);
// console.log(process.env.VUE_APP_PERSON);
// console.log(process.env.NODE_ENV);


// axios的数据参数测试
// import './network/request/axios-demo'
// import  lyRequest from './network/index'
// lyRequest.request({
//   url:'/home/multidata',
//   method:'GET',
//   headers:{
//   },
//   interceptors:{
//     requestInterceptor:(config:LYRequestConfig)=>{
//       console.log('单独请求的config')

//       return config
//     },
//     responseInterceptor:(err)=>{
//       console.log('单独请求的response')
//       return err
//     }
//   },
//   showLoading:true
// }).then((res)=>{
//   console.log(res)
// })


