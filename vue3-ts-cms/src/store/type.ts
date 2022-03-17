import { loginModule } from './login/login';
import { ILoginState } from './login/type';
export interface IRootState{
  name:string,
  age:number
}

export interface ILogin{
  loginModule:ILoginState
}

export type storeState=IRootState&ILogin
