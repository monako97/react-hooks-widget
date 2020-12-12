import { ReactElement, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

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

/**
 * 打开一个 Panel 面板
 * @constructor
 * @param {ReactElement} renderDom  需要显示在 Panel 面板里的内容
 * @param {string} newPanel         容器id（传入相同的id会清除旧内容）
 * @example
 * ``` js
 * openPanel(<span>示例</span>);
 * openPanel(<span>指定 容器id为 demo-panel</span>, 'demo-panel');
 * ```
 */
const openPanel = (renderDom: ReactElement, newPanel?: string): void => {
  const ids: string = newPanel || 'Panel-Panel-panel-Box';
  let box: HTMLElement | null = document.getElementById(ids);

  if (box) {
    unmountComponentAtNode(box);
  } else {
    box = document.createElement('div');
    box.id = ids;
    document.body.appendChild(box);
  }
  render(renderDom, box);
};

/**
 * 判断当前时间是晚上还是白天
 * @returns {string} light | night
 */
const getDefaultTheme = (): ThemeTypes['type'] => {
  const endTime = new Date().setHours(6, 0, 0, 0); // 当天6点
  const startTime = new Date().setHours(18, 0, 0, 0); // 当天18点
  const justNowTime = new Date().getTime(); // 现在
  let defaultTheme: ThemeTypes['type'] = 'light';

  if (justNowTime > endTime) {
    // 过了早上6点
    if (justNowTime > startTime) {
      // 过晚上6点，晚上
      defaultTheme = 'night';
    } else {
      // 白天
      defaultTheme = 'light';
    }
  } else {
    // 还是晚上
    defaultTheme = 'night';
  }

  return defaultTheme;
};

interface UseThemeTypes {
  type: 'light' | 'night';
  setType: React.Dispatch<ThemeTypes['type']>;
}

/**
 * 主题 hooks
 * @returns {UseThemeTypes} theme and setTheme
 */
const useTheme = (): UseThemeTypes => {
  const [type, setType] = useState<ThemeTypes['type']>(getDefaultTheme());

  return { type, setType };
};

/**
 * 实用程序
 * @param {function} getMaxZIndex        获取最大 z-index
 * @param {function} openPanel           打开一个 Panel 面板
 * @param {function} getDefaultTheme     判断当前时间是晚上还是白天
 * @param {function} useTheme            主题 hooks
 */
const utils = {
  getMaxZIndex,
  openPanel,
  getDefaultTheme,
  useTheme
};

export default utils;
