// pages/detail-video/index.js
import {
  getMVURL,
  getMVDetail,
  getRelatedVideo,
} from "../../../service/api_video";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoUrl: {},
    videoInfo: {},
    relatedVideos: [],
  },

  // 监听页面加载
  onLoad: async function (options) {
    const id = options.id;
    // 1.获取视频播放地址
    getMVURL(id).then((res) => {
      this.setData({ videoUrl: res.data });
    });

    // 2.获取视频详细信息
    getMVDetail(id).then((res) => {
      this.setData({
        videoInfo: res.data,
      });
    });

    // 3.获取相关视频
    getRelatedVideo(id).then((res) => {
      this.setData({
        relatedVideos: res.data,
      });
    });
  },
});
