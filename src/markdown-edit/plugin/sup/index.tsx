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

const Sup: EditorPluginTypes = ({ editor }: EditorPlugin) => {
  const handleClick = () => {
    // 调用API，往编辑器中插入字符
    editor.insertText('^^', false, {
      start: 1,
      end: 1
    });
  };

  return (
    <span className="button button-type-sup monako__icon" title="上标" onClick={handleClick} />
  );
};

Sup.align = 'left';
Sup.pluginName = 'font-sup';

export default Sup;
