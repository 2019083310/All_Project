import axios from 'axios'
import qs from 'qs'

// 1.模拟axios网络请求
const data={
  name:'coder',
  age:18,
  height:1.88
}
axios.get('http://httpbin.org/get',{
  headers:{
    'Content-Type':'application/www-form/urlencoded'
  },
  params:qs.stringify(data)
}).then(res=>{
  console.log(res)

})
