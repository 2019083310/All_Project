import Vue from 'vue'
import App from './App.vue'
import router from './routes/index'

import './assets/css/normalize.min.css'

// 引入第三方插件库
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(elementUI)

const app=new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

console.log(app)