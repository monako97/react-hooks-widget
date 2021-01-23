import React from 'react';
import isEqual from 'lodash/isEqual';
import './index.less';

interface WaveCircleProps {
  bgColor?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const _WaveCircle: React.FC<WaveCircleProps> = ({
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
        } as React.CSSProperties
      }
    >
      <i className="monako__wave--circles--circle" />
      <i className="monako__wave--circles--circle" />
      <i className="monako__wave--circles--circle" />
      {children}
    </div>
  );
};

/**
 * 圆形波纹
 * @constructor
 * @param {string} bgColor 波浪背景色
 * @param {CSSProperties} style 样式
 * @param {React.ReactNode} children 内容
 */
export const WaveCircle = React.memo(_WaveCircle, (pre, next) => {
  return isEqual(pre, next);
});
