import axios from 'axios'

export function request(config){
  const instance=axios.create({
    baseURL:'http://127.0.0.1:8888/api/private/v1',
    timeout:1000*30
  })

  instance.interceptors.request.use(config=>{
    // 登录授权 请求验证是否有token  需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  },error=>{
    return console.log(error)
  })

  instance.interceptors.response.use(res=>{
    return res.data
  })

  return instance(config)
}