import axios from 'axios'
import type {AxiosRequestConfig} from 'axios'

export function requestData(config:AxiosRequestConfig){
  const instance =axios.create({
    baseURL:'http://152.136.185.210:5000',
    timeout:10*1000
  })

  instance.interceptors.request.use((config)=>{
    return config
  },err=>{
    console.log(err.response.errStatus)
  })

  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err)
  })

  return instance(config)
}
