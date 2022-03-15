import {createStore} from 'vuex'

import {loginModule} from './login/login'
import {IRootState} from './type'

const store= createStore<IRootState>({
  state(){
    return {
      name:'coder',
      age:18
    }
  },
  getters:{},
  mutations:{},
  actions:{},
  modules:{
    loginModule
  }
})

export function setupStore(){
  store.dispatch('loginModule/loadLocalLogin')
}

export default store
