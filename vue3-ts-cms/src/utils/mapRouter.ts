import type {RouteRecordRaw} from 'vue-router'

import {IBreadCrumb} from '../base-ui/breadcrumb/type'

export let firstMenu:any=undefined
export let firstRoute:RouteRecordRaw|undefined=undefined

export function MapMenusToRoutes(userMenus:any[]):RouteRecordRaw[]{
  const routes:RouteRecordRaw[]=[]

  // 1.先把所有的路由实例对象添加到数组中
  const allRoutes:RouteRecordRaw[]=[]
  // require.context是webpack提供给我们的方法
  // 用于递归读取目录下的文件,解析模块
  // 返回给我们一个里面有keys函数的对象，调用keys方法返回读取的模块的路径,一个数组
  const routeFiles=require.context('../router/main',true,/\.ts$/)
  routeFiles.keys().forEach(key=>{
    // key是模块路径，require()引入模块Module,里面有default对象就是每个路由对象
    if(key.indexOf('./main.ts')!==-1) return
    const route=require('../router/main'+key.split('.')[1])

    allRoutes.push(route.default)
  })

  // 2.根据返回给我们的userMenus,动态添加路由
  // type===1->children-->type===1
  // type===2-->url-->route这才是要真正添加的路由
  const getRout=(menus:any[])=>{
    for(const menu of menus){
      if(menu.type===2){
        const route=allRoutes.find((route)=>route.path===menu.url)
        if(route) routes.push(route)
        if(!firstMenu&&!firstRoute){
          firstMenu=menu
          firstRoute=route
        }
      }else{
        getRout(menu.children??[])
      }
    }
  }
  getRout(userMenus)

  return routes
}

// 面包屑名字的动态获取
export function pathToBreadCrumb(userMenus:any[],currentPath:string){
  const breadcrumb:IBreadCrumb[]=[]
  pathToMenu(userMenus,currentPath,breadcrumb)

  return breadcrumb
}

export function pathToMenu(userMenus:any[],currentPath:string,breadcrumb?:IBreadCrumb[]):any{
  for(const menu of userMenus){
    if(menu.type===1){
      const findMenu=pathToMenu(menu.children??[],currentPath)
      if(findMenu){
        breadcrumb?.push({name:menu.name})
        breadcrumb?.push({name:findMenu.name})
        return findMenu
      }
    }else if(menu.type===2&&menu.url===currentPath){
      return menu
    }
  }
}


// 这个是用来对main重定向到那个页面所对应的左侧列表的选中
// 以及对面包蟹的封装
// export function pathToMenu(userMenus:any[],currentPath:string):any{
//   for(const menu of userMenus){
//     if(menu.type===1){
//       const findMenu=pathToMenu(menu.children??[],currentPath)
//       if(findMenu){
//         return findMenu
//       }
//     }else if(menu.type===2&&menu.url===currentPath){
//       return menu
//     }
//   }
// }

// 获取页面的按钮权限
export function mapMenusToPermissions(userMenus:any[]){
  const permissions:string[]=[]

  // 递归获取
  const _recurseGetPermission=(menus:any[])=>{
    for(const menu of menus){
      if(menu.type===1||menu.type===2){
        _recurseGetPermission(menu.children??[])
      }else if(menu.type===3){
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}
