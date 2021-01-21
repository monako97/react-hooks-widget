import isNull from 'lodash/isNull';

interface ClientSizeTypes {
  width: number;
  height: number;
}
/**
 * 获取可视区域大小
 * @return {ClientSizeTypes} clientWidth and clientHeight
 */
export const getClientSize = (): ClientSizeTypes => {
  if (!isNull(window.innerWidth)) {
    // ie9 +  最新浏览器
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  } else if (document.compatMode === 'CSS1Compat') {
    // 标准浏览器
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }
  return {
    // 怪异浏览器
    width: document.body.clientWidth,
    height: document.body.clientHeight
  };
};

/**
 * 获取最大 z-index
 * @returns {number} z-index
 */
export const getMaxZindex = (): number => {
  return (Array.prototype.slice.call(document.body.querySelectorAll('*')) || []).reduce(
    (r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0),
    0
  );
};
