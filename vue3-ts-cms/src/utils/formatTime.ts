import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
// 对服务器返回的时间格式化，如果服务器此时返回的是utc格式
// 默认情况下dayjs不支持utc格式---UTC时间格式（2018-01-22T09:12:43.083Z）
// 先做扩展,支持utc格式       ----如果是时间戳不用扩展
// 另外dayjs是轻量级的，而momentjs比较大不推荐
dayjs.extend(utc)

const DATE_TIME_FORMAT='YYYY-MM-DD HH:mm:ss'
export function formatUtcString(utcString:string,format:string=DATE_TIME_FORMAT){
  return dayjs.utc(utcString).format(format)
}
