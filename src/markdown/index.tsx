import './index.less';
import React, { useMemo, useState } from 'react';
import markdownUtil from '../utils/markdown-util';

const defaultCln = 'monako__markdown-box ';

const MarkDown: React.FC<{ text: string; className: string }> = ({
  text = '### 加载中...',
  className = ''
}) => {
  const [cln, setCln] = useState(defaultCln);

  useMemo(() => {
    setCln(defaultCln.concat(className));
  }, [className]);

  return (
    <div
      className={cln}
      dangerouslySetInnerHTML={{
        __html: markdownUtil(text)
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
const MarkDowns = React.memo(MarkDown, (pre, next) => {
  return pre.text === next.text && pre.className === next.className;
});

export default MarkDowns;
