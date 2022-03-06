import Vue from 'vue'
import router from './router'
import App from './App.vue'

import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//导入第三方插件treetable
import TreeTable from 'vue-table-with-tree-grid'
//将TreeTable注册为全局组件
Vue.component('tree-table', TreeTable)

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

//导入字体图标
import './assets/fonts/iconfont.css'
import './assets/css/basic.css'

Vue.config.productionTip = false

Vue.use(elementUI)
// 将富文本编辑器注册为全局组件
Vue.use(VueQuillEditor)

// 全局时间过滤器
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
