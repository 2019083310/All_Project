// 封装一个公共的网络请求模块
const BASE_URL = "http://123.207.32.32:9001";
const SIGN_BASE_URL = "http://123.207.32.32:3000";

const token = wx.getStorageSync("token");

class LyRequest {
  constructor(BASE_URL, authHeader = {}) {
    this.BASE_URL = BASE_URL;
    this.authHeader = authHeader;
  }

  request(url, method, params, isAuth = false, header = {}) {
    const finialHeader = isAuth ? { ...this.authHeader, ...header } : header;
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.BASE_URL + url,
        method: method,
        data: params,
        header: finialHeader,
        success(res) {
          resolve(res.data);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }

  get(url, params, isAuth = false, header) {
    return this.request(url, "GET", params, isAuth, header);
  }

  post(url, data, isAuth = false, header) {
    return this.request(url, "POST", data, isAuth, header);
  }
}

export const lyRequest = new LyRequest(BASE_URL);
export const lySignRequest = new LyRequest(SIGN_BASE_URL, { token });

// export default lyRequest;
