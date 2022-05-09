export function parseIyric(IyricInfos) {
  const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

  const IyricArr = IyricInfos.split("\n");
  const result = [];
  for (const lineStr of IyricArr) {
    const regArr = timeReg.exec(lineStr);
    if (!regArr) continue;
    const min = regArr[1] * 1000 * 60;
    const sec = regArr[2] * 1000;
    const sec2 = regArr[3].length === 3 ? regArr[3] * 1 : regArr[3] * 10;
    const time = min + sec + sec2;

    const text = lineStr.replace(regArr[0], "");
    result.push({ time, text });
  }

  return result;
}
