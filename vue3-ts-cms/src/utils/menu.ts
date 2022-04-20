import type { UserMenu } from '/@/service/types'
import type { BreadcrumbProp } from '/@/base-ui/menu-guide'
/**
 * 获取按钮权限
 */
export const getUserPermissins = (userMenus: UserMenu[]): string[] => {
  const permissions: string[] = []
  if (userMenus?.length) _recursiveGetPermission(userMenus, permissions)
  return permissions
}

/**
 * 获取用户菜单权限
 */
export const getUserMenus = (userMenus: UserMenu[]): UserMenu[] => {
  const menus = [...userMenus] // 备份（纯函数）
  _recursiveDeleteBtnPermission(menus)
  return menus
}

/**
 * 获取第一个菜单
 */
export const getFirstMenuPath = (userMenus: UserMenu[]): string => {
  const firstMenu = _recursiveGetFirstMenu(userMenus)
  if (firstMenu) return firstMenu.url || ''
  return ''
}

/**
 * 获取菜单
 */
export const getMenuByPath = (userMenus: UserMenu[], pathName: string): UserMenu | void => {
  const currentMenu = _recursiveMenuByPath(userMenus, pathName)
  return currentMenu
}

/**
 * 获取菜单
 */
export const getBreadcrumbsByPath = (userMenus: UserMenu[], pathName: string): BreadcrumbProp[] => {
  const breadcrumbs: BreadcrumbProp[] = []
  _recursiveGetReadcrumbsByPath(userMenus, pathName, breadcrumbs)
  return breadcrumbs.reverse()
}

/**
 * 递归菜单树 获取按钮权限
 */
const _recursiveGetPermission = (menus: UserMenu[], resultPremission: string[]) => {
  menus.forEach((menu: UserMenu, index: number) => {
    // 目录
    if (menu.type === 1) {
      const children = menu?.children || []
      // 递归
      _recursiveGetPermission(children, resultPremission)
      // 菜单
    } else if (menu.type === 2) {
      const children = menu?.children || []
      _recursiveGetPermission(children, resultPremission)
      // 按钮
    } else {
      resultPremission.push(menu?.permission)
    }
  })
}

/**
 * 递归 - 删除按钮权限
 */
const _recursiveDeleteBtnPermission = (menus: UserMenu[]): void => {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    // 目录
    if (menu.type === 1) {
      const children = menu?.children || []
      _recursiveDeleteBtnPermission(children) // 递归
      // 菜单
    } else if (menu.type === 2) {
      const children = menu?.children || []
      if (children?.length) {
        // 删除按钮权限数组
        delete menu.children
        menu.children = []
      }
    }
  }
}
/**
 * 递归菜单树 获取第一个菜单
 */
const _recursiveGetFirstMenu = (menus: UserMenu[]): UserMenu | void => {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    // 目录
    if (menu.type === 1) {
      const children = menu?.children || []
      // 递归
      const m = _recursiveGetFirstMenu(children)
      if (m) return m
      // 菜单
    } else if (menu.type === 2) {
      return menu
    }
  }
}

/**
 * 根据路径获取菜单
 */
const _recursiveMenuByPath = (menus: UserMenu[], pathName: string): UserMenu | void => {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    // 目录
    if (menu.type === 1) {
      const children = menu?.children || []
      // 递归
      const m = _recursiveMenuByPath(children, pathName)
      if (m) return m
      // 菜单
    } else if (menu.type === 2 && menu.url === pathName) {
      return menu
    }
  }
}

/**
 * 递归获取 面包屑
 */
const _recursiveGetReadcrumbsByPath = (
  menus: UserMenu[],
  pathName: string,
  breadcrumbs: BreadcrumbProp[]
): UserMenu | void => {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    // 目录
    if (menu.type === 1) {
      const children = menu?.children || []
      // 递归
      const m = _recursiveGetReadcrumbsByPath(children, pathName, breadcrumbs)
      if (m) {
        breadcrumbs.push({
          name: menu.name,
          path: '' // 目录不需要添加path
        })
        return m
      }
      // 菜单
    } else if (menu.type === 2 && menu.url === pathName) {
      breadcrumbs.push({
        name: menu.name,
        path: menu.url
      })
      return menu
    }
  }
}
