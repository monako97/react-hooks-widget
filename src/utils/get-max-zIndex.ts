/**
 * 获取最大 z-index
 * @returns {number} z-index
 */
const getMaxZIndex = (): number => {
  return (Array.prototype.slice.call(document.body.querySelectorAll('*')) || []).reduce(
    (r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0),
    0
  );
};

export default getMaxZIndex;
