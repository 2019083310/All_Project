import LyRequest from './request'
import {BASE,TIME_OUT} from './request/config'
import type {LYRequestConfig} from './request/type'

const lyRequest=new LyRequest({
  baseURL:BASE,
  timeout:TIME_OUT,
  interceptors:{
    requestInterceptor:(config:LYRequestConfig)=>{
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch:(err)=>{
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor:(res)=>{
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch:(err)=>{
      console.log('响应失败的拦截')
      return err
    }
  }
})

export default lyRequest
