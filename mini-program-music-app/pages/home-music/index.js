// pages/home-music/index.js
import { getMusicBanner, getHotMusicMenu } from "../../service/api-music";
import queryRect from "../../utils/queryRect";
import throttle from "../../utils/throttle";
import { store, rankingMap, playerStore } from "../../store/index";

const throttleGetRect = throttle(queryRect, 1000);

Page({
  data: {
    bannerList: [],
    swiperHeight: 140,
    recommandSongs: [],
    hotMusicMenu: [],
    recommandMenu: [],
    rankings: { 0: {}, 2: {}, 3: {} },

    currentSong: {},
    playing: true,
    playState: "paused",
    isSign: false,

    nickName: "",
    avatarUrl: "",
  },
  onLoad(options) {
    //   获取轮播图数据
    getMusicBanner().then((res) => {
      this.setData({
        bannerList: res.banners,
      });
    });
    // 获取热门音乐数据列表
    store.dispatch("getHotMusicAction");
    // 响应式获取，用这个库的onState方法对歌单列表做一个监听
    store.onState("hotMusicList", (res) => {
      this.setData({
        recommandSongs: res.slice(0, 6),
      });
    });
    // 获取热门歌单
    getHotMusicMenu().then((res) => {
      this.setData({
        hotMusicMenu: res.playlists,
      });
    });
    // 获取推荐歌单
    getHotMusicMenu("华语").then((res) => {
      this.setData({
        recommandMenu: res.playlists,
      });
    });
    //获取巅峰榜歌单数据
    store.onState("newMusicList", this.getRankingList(0));
    store.onState("orginMusicList", this.getRankingList(2));
    store.onState("upMusicList", this.getRankingList(3));

    // 从store获取共享的数据
    this.setupPlayerStoreListener();
    if (wx.getStorageSync("isSign")) {
      this.setData({
        nickName: getApp().globalData.nickName,
        avatar: getApp().globalData.avatar,
        isSign: true,
      });
    } else {
      this.handleSignClick();
    }
  },

  //   事件处理函数--点击搜索按钮跳转
  handleSearchClick() {
    wx.navigateTo({
      url: "/pages/page-search/index",
    });
  },
  //   监听图片加载完成微信小程序给我们提供的方法--bindload
  handleImageLoaded() {
    throttleGetRect(".points").then((res) => {
      this.setData({
        swiperHeight: res[0].height,
      });
    });
  },
  onUnload() {},
  //   获取绑定数据封装函数
  getRankingList(idx) {
    return (res) => {
      if (res.length === 0) return;
      const name = res.name;
      const coverImgUrl = res.coverImgUrl;
      const playCount = res.playCount;
      const list = res.tracks.slice(0, 3);
      const newRanking = { name, coverImgUrl, playCount, list };
      this.setData({
        rankings: { ...this.data.rankings, [idx]: newRanking },
      });
    };
  },
  //   榜单跳转处理函数
  handleRankingClick(e) {
    this.navigateToFn(rankingMap[e.target.dataset.idx]);
  },
  navigateToFn(rankingName) {
    wx.navigateTo({
      url: `/packageDetail/pages/detail-song/index?rankingName=${rankingName}&type=rank`,
    });
  },
  setupPlayerStoreListener() {
    playerStore.onStates(
      ["currentSong", "playing"],
      ({ currentSong, playing }) => {
        if (currentSong) this.setData({ currentSong });
        if (playing !== undefined) {
          this.setData({
            playing,
            playState: playing ? "running" : "paused",
          });
        }
      }
    );
  },
  handlePauseClick() {
    playerStore.dispatch("changePlayStatusAction", !this.data.playing);
  },
  handleBarClick() {
    wx.navigateTo({
      url:
        "/packagePlayer/pages/music-player/index?id=" +
        this.data.currentSong.id,
    });
  },
  handleSignClick() {
    wx.getUserProfile({
      desc: "用于完善个人信息",
      success: (res) => {
        this.setData({
          nickName: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl,
          isSign: true,
        });
        wx.setStorageSync("nickName", res.userInfo.nickName);
        wx.setStorageSync("avatar", res.userInfo.avatarUrl);
        wx.setStorageSync("isSign", true);
      },
    });
  },
});
