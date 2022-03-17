import 'element-plus/theme-chalk/base.css'
// 注册图标
import * as ElIcons from '@element-plus/icons-vue'
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElBreadcrumb,
  ElTabPane,
  ElTabs,
  ElCheckbox,
  ElLink,
  ElInput,
  ElMenu,
  ElMenuItem,
  ElSubMenu
} from 'element-plus'
import { App } from 'vue'

const components = [
  ElBreadcrumb,
  ElButton,
  ElFormItem,
  ElForm,
  ElTabPane,
  ElTabs,
  ElCheckbox,
  ElLink,
  ElInput,
  ElSubMenu,
  ElMenu,
  ElMenuItem
]

export function registerGlobalComponent(app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }
  for (const name in ElIcons){
    app.component(name,(ElIcons as any)[name])
  }
}
