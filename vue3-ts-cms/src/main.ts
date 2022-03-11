import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// axios的数据参数测试
// import './network/request/axios-demo'
import  lyRequest from './network/index'

// element-plus的全局引入
// import ElementPlus from 'element-plus'
// 样式
// import 'element-plus/theme-chalk/index.css'

// element-plus按需引入
import {registerGlobal} from './global/index'

const app=createApp(App)

app.use(registerGlobal)
// app.use(ElementPlus)
app.use(router)
app.use(store)
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

lyRequest.request({
  url:'/home/multidata',
  method:'GET',
  headers:{
    'X-Access-Token':''
  },
  interceptors:{
    requestInterceptor:(config)=>{
      console.log('单独请求的config')
      // config.headers['X-Access-Token']='123'
      return config
    },
    responseInterceptor:(err)=>{
      console.log('单独请求的response')
      return err
    }
  },
  showLoading:true
}).then((res)=>{
  console.log(res)
})


