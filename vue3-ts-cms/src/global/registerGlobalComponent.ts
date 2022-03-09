import 'element-plus/theme-chalk/base.css'
import {ElButton,ElForm,ElAlert,ElAvatar,ElRadio,ElBreadcrumb} from 'element-plus'
import {App} from 'vue'

const components=[ElAlert,ElBreadcrumb,ElButton,ElRadio,ElAvatar,ElForm]

export function registerGlobalComponent(app:App){
  for(const component of components){
    app.component(component.name,component)
  }
}
