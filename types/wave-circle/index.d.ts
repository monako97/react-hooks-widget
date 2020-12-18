import React, { CSSProperties, ReactNode } from 'react';
import './index.less';
interface WaveCircleProps {
    bgColor?: string;
    style?: CSSProperties;
    children?: ReactNode;
}
/**
 * 圆形波纹
 * @constructor
 * @param {string} bgColor 波浪背景色
 * @param {CSSProperties} style 样式
 * @param {ReactNode} children 内容
 */
declare const WaveCircle: React.NamedExoticComponent<WaveCircleProps>;
export default WaveCircle;
