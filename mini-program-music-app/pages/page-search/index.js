// pages/page-search/index.js
import {
  getSearchHot,
  getSearchSuggest,
  getSearchKeywords,
} from "../../service/api-search";
import debounce from "../../utils/debounce";
import stringToKeyword from "../../utils/stringToKeyword";
import { playerStore } from "../../store/index";

const debounceSearchChange = debounce(getSearchSuggest, 300);

Page({
  data: {
    searchKeyList: [],
    serachValue: "",
    serachValueList: [],
    searchValueNodes: [],
    resultSongs: [],
  },

  onLoad(options) {
    this.getSearchHotKey();
  },
  // 网络数据请求
  getSearchHotKey() {
    getSearchHot().then((res) => {
      this.setData({ searchKeyList: res.result.hots });
    });
  },
  //   处理事件请求
  handleSearchChange(e) {
    const keywords = e.detail;
    this.setData({
      serachValue: keywords,
    });
    if (!keywords.length) {
      this.setData({
        serachValueList: [],
        resultSongs: [],
      });
      debounceSearchChange.cancel();
      return;
    }
    debounceSearchChange(keywords).then((res) => {
      // 1.获取建议的关键词歌曲
      const suggestSongs = res.result.allMatch;
      this.setData({
        serachValueList: suggestSongs,
      });

      // 2.转成nodes节点
      const suggestKeywords = suggestSongs.map((item) => item.keyword);
      const suggestSongsNodes = [];
      for (const keyword of suggestKeywords) {
        const nodes = stringToKeyword(keyword, keywords);
        suggestSongsNodes.push(nodes);
      }
      this.setData({
        searchValueNodes: suggestSongsNodes,
      });
    });
  },
  handleSearchEnter() {
    const keywords = this.data.serachValue;
    getSearchKeywords(keywords).then((res) => {
      this.setData({
        resultSongs: res.result.songs,
      });
    });
  },
  handleKeywordClick(e) {
    // 1.获取关键字
    const keywords = e.currentTarget.dataset.keyword;

    // 2.同步搜索框数据
    this.setData({
      serachValue: keywords,
    });

    // 3.发送网络请求
    getSearchKeywords(keywords).then((res) => {
      this.setData({
        resultSongs: res.result.songs,
      });
    });
  },
  handleItemClick(e) {
    const id = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: "/packagePlayer/pages/music-player/index?id=" + id,
    });
    playerStore.dispatch("setPlayerPageAction", { id });
    playerStore.setState("playListIndex", index);
    playerStore.setState("playListSong", this.data.resultSongs);
  },
});
