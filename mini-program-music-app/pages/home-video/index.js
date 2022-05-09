// pages/home-video/index.js
import { getTopMV } from "../../service/api_video";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    topMvs: [],
    hasMore: true,
  },
  // 页面加载
  onLoad(options) {
    wx.showLoading({
      title: "数据请求加载中...",
    });
    getTopMV(0).then((res) => {
      this.setData({ topMvs: res.data });
      wx.hideLoading({
        success: (res) => {},
      });
    });
  },
  // 上拉加载更多
  onReachBottom() {
    if (!this.data.hasMore) return;
    getTopMV(this.data.topMvs.length).then((res) => {
      this.setData({
        topMvs: [...this.data.topMvs, ...res.data],
        hasMore: res.hasMore,
      });
    });
  },
  // 下拉刷新
  onPullDownRefresh() {
    getTopMV(0).then((res) => {
      this.setData({
        topMvs: res.data,
        hasMore: res.hasMore,
      });
    });
    wx.stopPullDownRefresh({
      success: (res) => {},
    });
  },
  // 点击跳转到详情页
  handleItemVideoClick(e) {
    wx.navigateTo({
      url:
        "/packageDetail/pages/detail-video/index?id=" +
        e.currentTarget.dataset.item.id,
    });
  },
});
