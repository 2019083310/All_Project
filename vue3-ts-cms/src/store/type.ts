import { ILoginState } from './login/type';
import {ISystemState} from './main/system/type'
export interface IRootState{
  name:string,
  age:number
}

export interface ILogin{
  loginModule:ILoginState,
  systemModule:ISystemState
}

export type storeState=IRootState&ILogin
