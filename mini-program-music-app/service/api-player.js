import { lyRequest } from "./index";

export function getSongDetail(ids) {
  return lyRequest.get("/song/detail", {
    ids,
  });
}

export function getSongIyric(id) {
  return lyRequest.get("/lyric", {
    id,
  });
}
