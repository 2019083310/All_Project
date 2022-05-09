// components/song-menu-v1/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotMusic: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleScrollClick(e) {
      const id = e.currentTarget.dataset.item.id;
      wx.navigateTo({
        url: `/packageDetail/pages/detail-song/index?id=${id}&type=menu`,
      });
    },
  },
});
