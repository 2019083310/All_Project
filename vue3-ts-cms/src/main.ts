import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

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
