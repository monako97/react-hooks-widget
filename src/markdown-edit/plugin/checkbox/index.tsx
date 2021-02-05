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

const Checkbox: EditorPluginTypes = ({ editor }: EditorPlugin) => {
  const handleClick = () => {
    // 调用API，往编辑器中插入字符
    editor.insertText(
      `
- [ ] 功能1
- [X] 功能2`,
      false,
      {
        start: 17,
        end: 20
      }
    );
  };

  return (
    <span
      className={`button button-type-checkbox neko__icon`}
      title="复选框"
      onClick={handleClick}
    />
  );
};

Checkbox.align = 'left';
Checkbox.pluginName = 'checkbox';

export default Checkbox;
