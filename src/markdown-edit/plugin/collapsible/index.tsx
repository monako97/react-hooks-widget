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

const Collapsible: EditorPluginTypes = ({ editor }: EditorPlugin) => {
  const handleClick = () => {
    // 调用API，往编辑器中插入字符
    editor.insertText(
      `<details>
<summary>点击展开折叠内容</summary>

正文
</details>`,
      false,
      {
        start: 19,
        end: 27
      }
    );
  };

  return (
    <span
      className={`button button-type-collapsible monako__icon`}
      title="折叠内容"
      onClick={handleClick}
    />
  );
};

Collapsible.align = 'left';
Collapsible.pluginName = 'collapsible';

export default Collapsible;
