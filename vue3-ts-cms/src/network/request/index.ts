import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LyRequestInterceptors, LYRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

class lyRequest {
  instance: AxiosInstance
  interceptors?: LyRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: LYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? true
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出来的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器: 请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        console.log('所有的实例都有的拦截器: 响应成功拦截')
        this.loading?.close()

        const data = res.data
        if(data.returnCode==='-1001'){
          console.log('请求失败')
        }else{
          return data
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 响应失败拦截')
        this.loading?.close()

        // if (err.response.status === '404') {
        //   console.log('404的错误')
        // }
        return err
      }
    )
  }

  request<T>(config: LYRequestConfig<T>):Promise<T>{
    return new Promise((resolve, reject) => {
      // 单个请求对config处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 判断是否需要显示Loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

     this.instance.request<any,T>(config).then((res) => {
        // 对单个请求的数据处理
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }

        // 将loading设置为true不会影响下一个请求
        this.showLoading = true

        // 将结果返回
        resolve(res)
      }).catch(err=>{
        this.showLoading=true
        reject(err)
        return err
      })
    })
  }

  get<T>(config:LYRequestConfig<T>):Promise<T>{
    return this.request<T>({...config,method:'GET'})
  }

  post<T>(config:LYRequestConfig<T>):Promise<T>{
    return this.request<T>({...config,method:'POST'})
  }

  put<T>(config:LYRequestConfig<T>):Promise<T>{
    return this.request<T>({...config,method:'PUT'})
  }

  delete<T>(config:LYRequestConfig<T>):Promise<T>{
    return this.request<T>({...config,method:'DELETE'})
  }
}

export default lyRequest
