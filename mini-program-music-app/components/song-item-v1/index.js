// components/song-item-v1/index.js
import { playerStore } from "../../store/index";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemClick(e) {
      const id = e.currentTarget.dataset.id;
      const index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: "/packagePlayer/pages/music-player/index?id=" + id,
      });
      playerStore.dispatch("setPlayerPageAction", { id });
      playerStore.setState("playListIndex", index);
      playerStore.setState("playListSong", this.properties.musicList);
    },
  },
});
