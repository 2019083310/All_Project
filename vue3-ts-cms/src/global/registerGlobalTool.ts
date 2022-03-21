import {formatUtcString} from '../utils/formatTime'
import {App} from 'vue'

export default function(app:App){
  // app是一个全局对象，里面有一个config属性(对象)，里面的globalProperties内的属性可以被全局共享
  // 包括router/store。。。。等等使用use方法之后会在config里面
  app.config.globalProperties.$filter={
    formatTime(utcString:string){
      return formatUtcString(utcString)
    }
  }
}
