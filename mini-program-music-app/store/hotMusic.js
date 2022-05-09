// 全局状态共享工具--event-store库
import { HYEventStore } from "hy-event-store";

import { getHotMusicList } from "../service/api-music";

// 创建一个store对象，这里面的state数据都是响应式的，如果有更新，都会触发update方法去更新数据
// onState('state中的属性',function(res){})--res拿到的就是store.state中的数据
// setState('state中的属性','value')--设置store.state中的值
// actions()原理和Vue中的一样，通过dispatch('actions中的事件类型',payLoad),去发起异步请求，做一些异步任务，actions:{}中的函数第一个参数ctx代表全局执行上下文，可以通过ctx.xxx获取到state中的数据，设置值
const store = new HYEventStore({
  state: {
    newMusicList: [], //0:新歌榜
    hotMusicList: [], //1:热歌榜
    orginMusicList: [], //2:原创榜
    upMusicList: [], //3:飙升榜
  },
  actions: {
    getHotMusicAction(ctx) {
      //   getHotMusicList(1).then((res) => {
      //     ctx.hotMusicList = res.playlist.tracks;
      //   });
      for (let i = 0; i < 4; i++) {
        getHotMusicList(i).then((res) => {
          switch (i) {
            case 0:
              ctx.newMusicList = res.playlist;
              break;
            case 1:
              ctx.hotMusicList = res.playlist.tracks;
              break;
            case 2:
              ctx.orginMusicList = res.playlist;
              break;
            case 3:
              ctx.upMusicList = res.playlist;
              break;
          }
        });
      }
    },
  },
});

export default store;
