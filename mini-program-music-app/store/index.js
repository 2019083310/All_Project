import store from "./hotMusic";
import { audioContext, playerStore } from "./player-store";

const rankingMap = {
  0: "newMusicList",
  1: "hotMusicList",
  2: "orginMusicList",
  3: "upMusicList",
};

export { store, rankingMap, audioContext, playerStore };
