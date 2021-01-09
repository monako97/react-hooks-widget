import React from 'react';
import markdownUtil from '../utils/markdown-util';
import './index.less';
const defaultCln = 'monako__markdown-box ';

const _MarkDown: React.FC<{ text: string; className: string }> = ({
  text = '#### 加载中...',
  className = ''
}) => {
  const [cln, setCln] = React.useState(defaultCln);

  React.useMemo(() => {
    setCln(defaultCln.concat(className));
  }, [className]);

  return (
    <div
      className={cln}
      dangerouslySetInnerHTML={{
        __html: markdownUtil(text) as string
      }}
    />
  );
};

/**
 * MarkDown
 * @param {string} text md内容
 * @param {string} className 容器类名
 * @returns {React.FC} ReactNode
 */
const MarkDown = React.memo(_MarkDown, (pre, next) => {
  return pre.text === next.text && pre.className === next.className;
});

export default MarkDown;
