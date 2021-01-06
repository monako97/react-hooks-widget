import React from 'react';
import Editor from 'react-markdown-editor-lite';
import './index.less';

interface SubProps {
  editor: Editor;
}

interface SubTypes extends React.FC<SubProps> {
  align: 'left' | 'right';
  pluginName: string;
}

const Sub: SubTypes = ({ editor }: SubProps) => {
  const handleClick = () => {
    // 调用API，往编辑器中插入字符
    editor.insertText('~~', false, {
      start: 1,
      end: 1
    });
  };

  return (
    <span className="button button-type-sub monako__icon" title="下标" onClick={handleClick} />
  );
};

Sub.align = 'left';
Sub.pluginName = 'font-sub';

export default Sub;
