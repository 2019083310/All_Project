// 视频页面所有的网络数据请求
import { lyRequest } from "./index";

// 获取MV列表
export function getTopMV(offset, limit = 10) {
  return lyRequest.request("/top/mv", "GET", {
    offset,
    limit,
  });
}

/**
 * 获取视频播放地址
 * @param {number} id
 */
export function getMVURL(id) {
  return lyRequest.get("/mv/url", {
    id: id,
  });
}

/**
 * 获取视频信息
 * @param {number} mvid
 */
export function getMVDetail(mvid) {
  return lyRequest.get("/mv/detail", {
    mvid: mvid,
  });
}

/**
 * 获取相关视频
 * @param {*} id
 */
export function getRelatedVideo(id) {
  return lyRequest.get("/related/allvideo", {
    id: id,
  });
}
