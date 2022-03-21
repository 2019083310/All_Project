import {App} from 'vue'
import {registerGlobalComponent} from './registerGlobalComponent'
import registerFormatTime from './registerGlobalTool'

export function registerGlobal(app:App){
  app.use(registerGlobalComponent)
  app.use(registerFormatTime)
}
