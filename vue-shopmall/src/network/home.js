import {request} from './request'

export function getMenuList(){
  return request({
    url:'/menus'
  })
}

export function getUserList({query,pagenum,pagesize}){
  return request({
    url:'/users',
    params:{
      query,
      pagenum,
      pagesize
    }
  })
}