import React from 'react';
import Editor from 'react-markdown-editor-lite';
import './index.less';

interface EditorPlugin {
  editor: Editor;
}

interface EditorPluginTypes extends React.FC<EditorPlugin> {
  align: 'left' | 'right';
  pluginName: string;
}

const Sub: EditorPluginTypes = ({ editor }: EditorPlugin) => {
  const handleClick = () => {
    // 调用API，往编辑器中插入字符
    editor.insertText('~~', false, {
      start: 1,
      end: 1
    });
  };

  return (
    <span className="button button-type-sub neko__icon" title="下标" onClick={handleClick} />
  );
};

Sub.align = 'left';
Sub.pluginName = 'font-sub';

export default Sub;
