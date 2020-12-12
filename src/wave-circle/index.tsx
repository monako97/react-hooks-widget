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
const WaveCircle: React.FC<WaveCircleProps> = ({
  bgColor = '#000',
  style = {},
  children = null
}: WaveCircleProps) => {
  return (
    <div
      className="monako__wave--circles"
      style={
        {
          ...style,
          '--wave-circles-bg-color': bgColor
        } as CSSProperties
      }
    >
      <i className="monako__wave--circles--circle" />
      <i className="monako__wave--circles--circle" />
      <i className="monako__wave--circles--circle" />
      {children}
    </div>
  );
};

export default WaveCircle;
