import { lySignRequest } from "./index";

export function getLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success: (res) => {
        const code = res.code;
        resolve(code);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

export function codeToToken(code) {
  return lySignRequest.post("/login", { code });
}

export function checkToken() {
  return lySignRequest.post("/auth", {}, true);
}

export function checkSession() {
  return new Promise((resolve) => {
    wx.checkSession({
      success: (res) => {
        resolve(true);
      },
      fail: (err) => {
        resolve(false);
      },
    });
  });
}
