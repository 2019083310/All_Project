import {createStore,Store,useStore as useVuexStore} from 'vuex'

import {loginModule} from './login/login'
import {systemModule} from './main/system/system'

import {IRootState,storeState} from './type'

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
    loginModule,
    systemModule
  }
})

export function setupStore(){
  store.dispatch('loginModule/loadLocalLogin')
}

export function useStore():Store<storeState>{
  return useVuexStore()
}

export default store
