import {request} from './request'

//获取侧边栏的标题
export function getCategory(){
  return request({
    url:'/category'
  })
}

//获取推荐数据
export function getSubcategory(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  }).catch(err => err);
}
//请求goods数据
export function getCategoryDetail(miniWallkey, type){
  return request({
    url:'/subcategory/detail',
    params:{
      miniWallkey,
      type
    }
  })
}
