// components/nav-header/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认标题",
    },
    rightText: {
      type: String,
      value: "更多",
    },
    showRight: {
      type: Boolean,
      value: true,
    },
  },
  data: {},
  methods: {
    handleToggleClick() {
      wx.navigateTo({
        url: `/packageDetail/pages/detail-song/index?rankingName=hotMusicList&type=rank`,
      });
    },
  },
});
