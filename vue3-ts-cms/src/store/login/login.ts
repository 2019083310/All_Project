import {Module} from 'vuex'

import localCache from '../../utils/cache'

import {IRootState} from '../type'
import {ILoginState} from './type'
import { loginAccountRequest } from '@/network/login/login'
import router from '@/router'

import {MapMenusToRoutes,mapMenusToPermissions} from '../../utils/mapRouter'

export const loginModule:Module<ILoginState,IRootState>={
  namespaced:true,
  state(){
    return {
      token:'',
      userInfo:{},
      userMenus:[],
      permissions:[]
    }
  },
  getters:{},
  actions:{
    // 完成登录逻辑
    async accountLoginAction({commit},payLoad){
      // 1.实现登录逻辑
      const loginResult= await loginAccountRequest({
        url:'/login',
        data:payLoad,
        method:'post'
      })
      const { id ,token} =loginResult.data
      commit('changeToken',token)
      localCache.setCache('token',token)

      // 2.请求用户信息
      const userInfoResult=await loginAccountRequest({
        url:'/users/'+id,
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      const userInfo=userInfoResult.data
      commit('changeUserInfo',userInfo)
      localCache.setCache('userInfo',userInfo)

      // 3.请求用户菜单
      // 实现路由的动态添加
      const userMenuResult=await loginAccountRequest({
        url:'/role/'+id+'/menu',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      const userMenus=userMenuResult.data
      commit('changeUserMenus',userMenus)
      localCache.setCache('userMenus',userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    loadLocalLogin({commit}){
      const token=localCache.getCache('token')
      if(token){
        commit('changeToken',token)
      }
      const userInfo=localCache.getCache('userInfo')
      if(userInfo){
        commit('changeUserInfo',userInfo)
      }
      const userMenus=localCache.getCache('userMenus')
      if(userMenus){
        commit('changeUserMenus',userMenus)
      }
    }
  },
  mutations:{
    changeToken(state,payLoad){
      state.token=payLoad
    },
    changeUserInfo(state,payLoad){
      state.userInfo=payLoad
    },
    changeUserMenus(state,payLoad){
      state.userMenus=payLoad

      // 动态注册路由
      const routes=MapMenusToRoutes(payLoad)

      // 动态添加路由
      routes.forEach(route=>{
        router.addRoute('main',route)
      })

      // 获取页面按钮权限
      const permissions=mapMenusToPermissions(payLoad)
      state.permissions=permissions
    }
  }
}
