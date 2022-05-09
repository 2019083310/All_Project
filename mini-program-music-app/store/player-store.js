// const audioContext = wx.createInnerAudioContext();
const audioContext = wx.getBackgroundAudioManager();

import { HYEventStore } from "hy-event-store";
import { getSongIyric, getSongDetail } from "../service/api-player";
import { parseIyric } from "../utils/parse-lyric";

const playerStore = new HYEventStore({
  state: {
    id: "",
    currentSong: {},
    durationTime: 0,
    IyricInfo: [],

    IyricText: "",
    currentIndex: 0,
    currentTime: 0,

    playing: true,
    playName: "pause",

    playmode: 0, //0: 循环 1:单曲 2:随机
    playListIndex: 0,
    playListSong: [],

    isStoping: false,
  },
  actions: {
    //1.发起网络请求/获取歌词/歌曲播放/歌曲监听
    setPlayerPageAction(ctx, { id }) {
      if (ctx.id == id) {
        this.dispatch("changePlayStatusAction", true);
        return;
      }

      // 0.清空上一次歌曲信息残留
      ctx.playing = true;
      ctx.currentSong = {};
      ctx.durationTime = 0;
      ctx.currentIndex = 0;
      ctx.IyricInfo = [];
      ctx.IyricText = "";
      ctx.currentTime = 0;

      ctx.id = id;
      ctx.playing = true;
      ctx.playName = ctx.playing === false ? "resume" : "pause";
      // 获取歌曲信息
      getSongDetail(id).then((res) => {
        ctx.currentSong = res.songs[0];
        ctx.durationTime = res.songs[0].dt;
      });
      getSongIyric(id).then((res) => {
        // 对歌词解析
        const IyricInfos = res.lrc.lyric;
        const IyricInfo = parseIyric(IyricInfos);
        ctx.IyricInfo = IyricInfo;
      });
      // 对歌曲播放
      audioContext.stop();
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      audioContext.title = id;
      audioContext.autoplay = true;

      audioContext.onCanplay(() => {
        audioContext.play();
      });

      audioContext.onTimeUpdate(() => {
        // 1.获取当前播放的时间
        const currentTime = audioContext.currentTime * 1000;

        // 2.根据当前时间修改currentTime
        ctx.currentTime = currentTime;
        if (!ctx.IyricInfo.length) return;

        // 3.获取歌词
        for (let i = 0; i < ctx.IyricInfo.length; i++) {
          if (currentTime < ctx.IyricInfo[i].time) {
            const currentIndex = i - 1;
            if (ctx.currentIndex !== currentIndex) {
              const IyricText = ctx.IyricInfo[currentIndex].text;
              ctx.IyricText = IyricText;
              ctx.currentIndex = currentIndex;
            }
            break;
          }
        }
      });

      audioContext.onEnded(() => {
        this.dispatch("handleItemClickAction");
      });

      audioContext.onPlay(() => {
        ctx.playing = true;
      });

      audioContext.onPause(() => {
        ctx.playing = false;
      });

      audioContext.onStop(() => {
        ctx.playing = false;
        ctx.isStoping = true;
      });
    },

    // 2.歌曲暂停
    changePlayStatusAction(ctx, playing = true) {
      ctx.playing = playing;
      ctx.playName = ctx.playing === false ? "resume" : "pause";
      if (ctx.playing && ctx.isStoping) {
        audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`;
        audioContext.title = ctx.currentSong.name;
        ctx.isStoping = false;
      }
      if (ctx.playing) {
        audioContext.play();
      } else {
        audioContext.pause();
      }
    },

    // 3.循环播放
    changeModeAction(ctx) {
      ctx.playmode = ctx.playmode + 1;
      if (ctx.playmode === 3) {
        ctx.playmode = 0;
      }
    },

    // 4.上一首/下一首
    handleItemClickAction(ctx, isNext = true) {
      let index = ctx.playListIndex;
      switch (ctx.playmode) {
        case 0:
          index = isNext ? index + 1 : index - 1;
          if (index === ctx.playListSong.length) index = 0;
          if (index === -1) index = ctx.playListSong.length - 1;
          break;
        case 1:
          break;
        case 2:
          index = Math.floor(Math.random() * ctx.playListSong.length);
          break;
      }

      let currentSong = ctx.playListSong[index];
      if (!currentSong) {
        currentSong = ctx.currentSong;
      } else {
        ctx.playListIndex = index;
      }

      this.dispatch("setPlayerPageAction", { id: currentSong.id });
    },
  },
});

export { audioContext, playerStore };
