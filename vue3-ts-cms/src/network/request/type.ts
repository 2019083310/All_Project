import type {AxiosRequestConfig,AxiosResponse} from 'axios'

export interface LyRequestInterceptors<T=AxiosResponse>{
  requestInterceptor?:(config:AxiosRequestConfig)=>AxiosRequestConfig
  requestInterceptorCatch?:(err:any)=>any
  responseInterceptor?:(res:T)=>T
  responseInterceptorCatch?:(err:any)=>any
}

export interface LYRequestConfig extends AxiosRequestConfig{
  interceptors?:LyRequestInterceptors
  showLoading?:boolean
}
