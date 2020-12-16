import { ReactElement } from 'react';
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
declare const openPanel: (renderDom: ReactElement, newPanel?: string | undefined) => void;
export default openPanel;
