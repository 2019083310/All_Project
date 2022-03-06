import axios from 'axios'

export function request(config){

  const instance=axios.create({
    baseURL:process.env.VUE_APP_API_URL || '/web/api',
    timeout:20*1000
  })
  //请求拦截
  instance.interceptors.request.use(config=>{
    return config
  },error=>{
    return Promise.reject(error)
  })

  //响应拦截
  instance.interceptors.response.use(res=>{
    return res.status===200?Promise.resolve(res):Promise.reject(res)
  },error=>{
    return Promise.reject(error)
  })

  instance(config)
}