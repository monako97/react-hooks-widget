import React from 'react';
import './index.less';

interface ProgressBarProps {
  progress?: number;
}

/**
 * 进度条
 * @param {number} progress 进度
 * @constructor
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 0 }: ProgressBarProps) => {
  return (
    <div className="progress_bar_box">
      <p className="progress_info">{progress}</p>
      <div
        className="progress_bar"
        style={
          {
            '--progress-bar-transform': `translateX(${progress - 100}%)`
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default ProgressBar;
