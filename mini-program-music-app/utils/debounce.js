// 防抖功能函数
export default function debounce(fn, delay, immediate = false) {
  let timer = null;
  let invoke = false;

  function _debounce(...args) {
    return new Promise((resolve, reject) => {
      if (timer) {
        clearTimeout(timer);
      }
      if (immediate && !invoke) {
        const result = fn.apply(this, args);
        invoke = true;
        resolve(result);
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, args);
          invoke = false;
          timer = null;
          resolve(result);
        }, delay);
      }
    });
  }

  _debounce.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      invoke = false;
    }
  };

  return _debounce;
}
