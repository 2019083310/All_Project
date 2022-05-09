// base-ui/nav-bar/imdex.js
Component({
  properties: {
    title: {
      type: String,
      value: "默认标题",
    },
  },
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
  },
  methods: {
    handleItemClick() {
      this.triggerEvent("click");
    },
  },
  options: {
    multipleSlots: true,
  },
  lifetimes: {},
  pageLifetimes: {},
});
