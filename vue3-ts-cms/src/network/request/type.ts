import type {AxiosRequestConfig,AxiosResponse, AxiosRequestHeaders} from 'axios'

export interface LyRequestInterceptors<T=AxiosResponse>{
  requestInterceptor?:(config:AxiosRequestConfig)=>AxiosRequestConfig
  requestInterceptorCatch?:(err:any)=>any
  responseInterceptor?:(res:T)=>T
  responseInterceptorCatch?:(err:any)=>any
}

export interface LYRequestConfig<T=AxiosResponse> extends AxiosRequestConfig{
  interceptors?:LyRequestInterceptors<T>
  showLoading?:boolean
}
