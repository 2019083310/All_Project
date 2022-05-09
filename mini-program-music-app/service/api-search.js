import { lyRequest } from "./index";

// 热词获取
export function getSearchHot() {
  return lyRequest.get("/search/hot");
}

// 关键词推荐获取
export function getSearchSuggest(keywords) {
  return lyRequest.get("/search/suggest", {
    keywords,
    type: "mobile",
  });
}

// 监听搜索事件向服务器发送请求，请求搜索推荐列表
export function getSearchKeywords(keywords) {
  return lyRequest.get("/search", {
    keywords,
  });
}
