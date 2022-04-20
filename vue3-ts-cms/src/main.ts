import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import router from './router'
import { setupRouterGuard } from '/@/router/guard/index'
import store, { setupStore } from './store'
import { setupGlobalProperties } from './global'
import App from './App.vue'
import './assets/css/index.less'
import 'animate.css'

const app = createApp(App)

app.use(router)
app.use(store)
// 重新获取pinia中的数据从localStorage中
setupStore()
// setup router guard
setupRouterGuard()
// 全局注册--时间格式化工具
setupGlobalProperties(app)

app.use(ElementPlus, { locale })
app.mount('#app')
// console.log(app)
