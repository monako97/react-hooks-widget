import { ReactElement } from 'react';
interface UseThemeTypes {
    type: 'light' | 'night';
    setType: React.Dispatch<ThemeTypes['type']>;
}
/**
 * 实用程序
 * @param {function} getMaxZIndex        获取最大 z-index
 * @param {function} openPanel           打开一个 Panel 面板
 * @param {function} getDefaultTheme     判断当前时间是晚上还是白天
 * @param {function} useTheme            主题 hooks
 */
declare const utils: {
    getMaxZIndex: () => number;
    openPanel: (renderDom: ReactElement, newPanel?: string | undefined) => void;
    getDefaultTheme: () => ThemeTypes['type'];
    useTheme: () => UseThemeTypes;
};
export default utils;
