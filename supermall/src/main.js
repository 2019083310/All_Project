import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import Vant from 'vant'
import 'vant/lib/index.css'

import FastClick from 'fastclick'

import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(Vant)

FastClick.attach(document.body)

Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

//初始化EventBus事件总线
Vue.prototype.$bus=new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
