import React from 'react';
import './index.less';
interface BrowserMockupProps {
    keyName?: string;
    className?: string;
    theme?: ThemeTypes['type'];
    fixed?: boolean;
    visible?: boolean;
    style?: React.CSSProperties;
    title?: string;
    children?: React.ReactNode | Node;
}
/**
 * BrowserMockup: 浏览器窗口模型
 * @constructor
 * @param {string} keyName                   - key.
 * @param {string} className                 - 自定义类名.
 * @param {'light' | 'night'} theme          - 风格.
 * @param {boolean} fixed                    - 使用固定定位.
 * @param {boolean} visible                  - 是否显示.
 * @param {React.CSSProperties} style        - 样式.
 * @param {React.ReactNode} children         - ReactNode.
 * @example
 * ``` js
 * <BrowserMockup
 *    className={'demo'}
 *    style={{ width: 500 }}
 *    fixed>
 * Demo
 * </BrowserMockup>
 * ```
 */
declare const BrowserMockup: React.NamedExoticComponent<BrowserMockupProps>;
export default BrowserMockup;
