// 1.方式一: 手动的切换不同的环境(不推荐)
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'coderwhy'

// const BASE_URL = 'http://coderwhy.org/prod'
// const BASE_NAME = 'kobe'

// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'james'

// 2.通过设置单独的根文件来访问
// .env.development  .env.production .env.test
//.env这样设置的在任何一个环境下都可以访问到

// 3.根据process.env.NODE_ENV来判断

let BASE=''
const TIME_OUT=10*1000

if(process.env.NODE_ENV==='development'){
  BASE='http://123.207.32.32:8000'
}else if(process.env.NODE_ENV==='production'){
  BASE='http://coderiu.rog'
}else{
  BASE='http://httpbin.org'
}

export {BASE,TIME_OUT}
