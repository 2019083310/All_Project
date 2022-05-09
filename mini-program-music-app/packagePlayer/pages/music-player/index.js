// pages/music-player/index.js
import { audioContext, playerStore } from "../../../store/index";

const modeName = ["order", "repeat", "random"];

Page({
  data: {
    id: "",
    currentPage: 0,
    contentHeight: 0,
    isMusicLyric: false,

    currentSong: [],
    durationTime: 0,
    IyricInfo: {},

    IyricText: "",
    currentIndex: 0,
    currentTime: 0,

    sliderValue: 0,
    isSliderChaning: false,
    lyricScrollTop: 0,

    playName: "pause",
    playing: true,

    playmodeName: "order",
  },
  onLoad(options) {
    // 1.获取id
    const id = options.id;
    this.setData({ id });

    playerStore.onStates(
      ["IyricInfo", "durationTime", "currentSong"],
      ({ IyricInfo, durationTime, currentSong }) => {
        if (currentSong) {
          this.setData({ currentSong });
        }
        if (durationTime) {
          this.setData({ durationTime });
        }
        if (IyricInfo) {
          this.setData({ IyricInfo });
        }
      }
    );

    playerStore.onStates(
      ["IyricText", "currentTime", "currentIndex"],
      ({ IyricText, currentTime, currentIndex }) => {
        if (currentTime && !this.data.isSliderChaning) {
          const sliderValue = (currentTime / this.data.durationTime) * 100;
          this.setData({ currentTime, sliderValue });
        }
        if (currentIndex) {
          this.setData({
            currentIndex,
            lyricScrollTop: currentIndex * 35,
          });
        }
        if (IyricText) {
          this.setData({ IyricText });
        }
      }
    );

    playerStore.onStates(
      ["playing", "playName", "playmode"],
      ({ playing, playName, playmode }) => {
        if (playing !== undefined) {
          this.setData({ playing });
        }
        if (playName !== undefined) {
          this.setData({ playName });
        }
        if (playmode !== undefined) {
          this.setData({ playmodeName: modeName[playmode] });
        }
      }
    );

    // 3.动态计算高度
    const globalData = getApp().globalData;
    const navBarHeight = globalData.statusBarHeight;
    const screenHeight = globalData.screenHeight;
    const isMusicLyric = globalData.isMusicLyric;
    const constantHeight = 44;
    const contentHeight = screenHeight - navBarHeight - constantHeight;
    this.setData({ contentHeight, isMusicLyric });
  },
  // 监听slider组件的点击
  handleSliderChange(e) {
    // 1.获取slider变化的值
    const value = e.detail.value;

    // 2.计算需要播放的currentTIme
    const currentTime = (this.data.durationTime * value) / 100;

    // 3.设置context播放currentTime位置的音乐
    if (this.data.playing) {
      audioContext.pause();
      audioContext.seek(currentTime / 1000);
    }

    // 4.记录最新的sliderValue, 并且需要讲isSliderChaning设置回false
    this.setData({ isSliderChaning: false, sliderValue: value });
  },
  //监听slider组件的滑动
  handleSliderChanging(e) {
    const value = e.detail.value;
    const currentTime = (this.data.durationTime * value) / 100;
    this.setData({ currentTime, isSliderChaning: true });
  },
  // 监听swiper-item组件的滑动
  handleTogglePage(e) {
    const current = e.detail.current;
    this.setData({
      currentPage: current,
    });
  },
  //处理导航点击事件
  handleNavBarClick() {
    wx.navigateBack({
      delta: 1,
    });
  },
  //   处理播放按钮
  handlePlayClick() {
    playerStore.dispatch("changePlayStatusAction", !this.data.playing);
  },
  //   处理循环播放按钮
  handleModeClick() {
    playerStore.dispatch("changeModeAction");
  },
  // 上一首
  handleItemPrevClick() {
    playerStore.dispatch("handleItemClickAction", false);
  },
  // 下一首
  handleItemNextClick() {
    playerStore.dispatch("handleItemClickAction");
  },
});
