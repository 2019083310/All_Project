// pages/detail-song/index.js
import { store, playerStore } from "../../../store/index";
import { getRankMusicItem } from "../../../service/api-music";
Page({
  data: {
    rankings: {},
    flag: false,
    type: "",
    songInfo: {},
  },
  onLoad(options) {
    const type = options.type;
    this.setData({ type });
    if (type === "rank") {
      const rankingName = options.rankingName;
      if (rankingName === "hotMusicList") {
        this.setData({
          flag: true,
        });
      } else {
        this.setData({
          flag: false,
        });
      }
      store.onState(rankingName, (res) => {
        this.setData({
          rankings: res,
        });
      });
    } else if (type === "menu") {
      const id = options.id;
      getRankMusicItem(id).then((res) => {
        this.setData({
          rankings: res.playlist.tracks,
          songInfo: res.playlist,
        });
      });
    }
  },
  handleItemClick(e) {
    const id = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: "/packagePlayer/pages/music-player/index?id=" + id,
    });
    playerStore.dispatch("setPlayerPageAction", { id });
    playerStore.setState("playListIndex", index);
    playerStore.setState(
      "playListSong",
      this.data.rankings.tracks || this.data.rankings
    );
  },
});
