import { lyRequest } from "./index";

// 获取轮播图
export function getMusicBanner() {
  return lyRequest.get("/banner", {
    type: 2,
  });
}

// 获取热门音乐列表
export function getHotMusicList(idx) {
  return lyRequest.get("/top/list", {
    idx,
  });
}

// 获取热门歌单
export function getHotMusicMenu(cat = "全部", limit = 6, offset = 0) {
  return lyRequest.get("/top/playlist", {
    cat,
    limit,
    offset,
  });
}

// 获取榜单数据
export function getRankMusicItem(id) {
  return lyRequest.get("/playlist/detail/dynamic", {
    id,
  });
}
