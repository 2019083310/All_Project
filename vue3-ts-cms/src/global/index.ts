import {App} from 'vue'
import {registerGlobalComponent} from './registerGlobalComponent'

export function registerGlobal(app:App){
  app.use(registerGlobalComponent)
}
