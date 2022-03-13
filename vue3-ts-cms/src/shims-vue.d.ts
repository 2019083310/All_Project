/* eslint-disable */
// 这个文件的作用主要是用来在ts文件中引入.vue文件
// 其中DefineComponent主要的作用是告诉我们返回的组件类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
