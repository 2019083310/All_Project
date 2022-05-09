// app.js
import {
  codeToToken,
  getLoginCode,
  checkToken,
  checkSession,
} from "./service/api_sign";

App({
  onLaunch() {
    //1.获取设备信息
    const info = wx.getSystemInfoSync();
    this.globalData.screenWidth = info.screenWidth;
    this.globalData.screenHeight = info.screenHeight;
    this.globalData.statusBarHeight = info.statusBarHeight;

    const deviceRadio =
      this.globalData.screenHeight / this.globalData.screenWidth;
    this.globalData.isMusicLyric = deviceRadio >= 2;

    // 2.在用户不知情的情况下登录
    this.handleCheckTokenEvent();

    // 3.获取用户信息
    const avatar = wx.getStorageSync("avatar");
    const nickName = wx.getStorageSync("nickName");
    this.globalData.nickName = nickName;
    this.globalData.avatar = avatar;
  },
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    isMusicLyric: false,
  },
  handleCheckTokenEvent: async function () {
    const token = wx.getStorageSync("token");
    // 判断token是否过期
    const checkResult = await checkToken();
    // 判断session是否过期
    const isSessionExpire = await checkSession();

    if (!token || checkResult.errorCode || !isSessionExpire) {
      this.handleVisibleEvent();
    }
  },

  handleVisibleEvent: async function () {
    getLoginCode().then((res) => {
      codeToToken(res).then((res) => {
        wx.setStorageSync("token", res.token);
      });
    });
  },
});
