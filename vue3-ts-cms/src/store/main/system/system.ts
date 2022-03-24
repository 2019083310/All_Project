import {Module} from 'vuex'

import {IRootState} from '../../type'
import {ISystemState} from './type'

import {requestData} from '../../../network/main'

export const systemModule:Module<ISystemState,IRootState>={
  namespaced:true,
  state(){
    return {
      usersList:[],
      usersCount:0,
      roleCount:0,
      roleList:[],
      goodsCount:0,
      goodsList:[],
      menuCount:0,
      menuList:[]
    }
  },
  mutations:{
    changeUsersList(state,payLoad:any[]){
      state.usersList=payLoad
    },
    changeUsersCount(state,payLoad:number){
      state.usersCount=payLoad
    },
    changeRoleList(state,payLoad:any[]){
      state.roleList=payLoad
    },
    changeRoleCount(state,payLoad:number){
      state.roleCount=payLoad
    },
    changeGoodsList(state,payLoad:any[]){
      state.goodsList=payLoad
    },
    changeGoodsCount(state,payLoad:number){
      state.goodsCount=payLoad
    },
    changeMenuList(state,payLoad:any[]){
      state.menuList=payLoad
    },
    changeMenuCount(state,payLoad:number){
      state.menuCount=payLoad
    }
  },
  actions:{
    // 发起网络请求，获取页面数据
    async getPageListAction({commit},payLoad:any){
      // 1.获取token
      const token=window.localStorage.getItem('token')
      let value
      if(token){
        value=JSON.parse(token)
      }

      // 2.获取url
      const pageName=payLoad.pageName

      // 3.发起请求
      const pageListResult=await requestData({
        method:'POST',
        url:`/${pageName}/list`,
        headers:{
          Authorization:`Bearer ${value}`
        },
        data:payLoad.queryInfo
      })

      // 4.存储数据到state中
      const {list,totalCount}=pageListResult.data

      const changePageName=pageName.slice(0,1).toUpperCase()+pageName.slice(1)
      commit(`change${changePageName}List`,list)
      commit(`change${changePageName}Count`,totalCount)
    }
  },
  getters:{
    pageListData(state){
      return (pageName:string)=>{
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state){
      return (pageName:string)=>{
        return (state as any)[`${pageName}Count`]
      }
    }
  }
}
