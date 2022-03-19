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
  ElSubMenu,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElCol,
  ElRadio,
  ElRow,
  ElBreadcrumbItem
} from 'element-plus'
import { App } from 'vue'

const components = [
  ElFormItem,
  ElForm,
  ElTabPane,
  ElTabs,
  ElCheckbox,
  ElLink,
  ElSubMenu,
  ElMenu,
  ElMenuItem,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElInput,
  ElBreadcrumb,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElButton,
  ElCol,
  ElRow,
  ElRadio,
  ElBreadcrumbItem
]

export function registerGlobalComponent(app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }
  for (const name in ElIcons){
    app.component(name,(ElIcons as any)[name])
  }
}
