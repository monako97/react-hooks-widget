import React from 'react';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import BubblyButton from '../bubbly-button';
import { markdownUtil } from '../utils/markdown-util';
import Editor from 'react-markdown-editor-lite';
import Sub from './plugin/sub';
import Sup from './plugin/sup';
import Emoji from './plugin/emoji';
import Checkbox from './plugin/checkbox';
import Collapsible from './plugin/collapsible';
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import './index.less';

interface MarkdownEditType {
  initValue?: string;
  submitText?: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (value: string, mdEditor: Editor | null) => void;
  htmlClass?: string;
}

Editor.use(Sub);
Editor.use(Sup);
Editor.use(Emoji);
Editor.use(Checkbox);
Editor.use(Collapsible);

const _MarkdownEdit: React.FC<MarkdownEditType> = ({
  initValue,
  onSubmit,
  submitText = '提交',
  htmlClass
}: MarkdownEditType) => {
  const [value, setValue] = React.useState('');
  const mdEditor = React.useRef<Editor>(null);

  React.useMemo(() => {
    if (initValue) setValue(initValue);
  }, [initValue]);

  const handleSubmit = () => {
    if (isFunction(onSubmit)) {
      onSubmit(mdEditor.current?.getMdValue() || '', mdEditor.current);
    }
  };

  return (
    <div className="editor_box">
      <Editor
        ref={mdEditor}
        plugins={[
          'emoji',
          'header',
          'font-bold',
          'font-italic',
          'font-underline',
          'font-strikethrough',
          'font-sub',
          'font-sup',
          'list-unordered',
          'list-ordered',
          'checkbox',
          'block-quote',
          'collapsible',
          'block-wrap',
          'block-code-inline',
          'block-code-block',
          'table',
          'image',
          'link',
          'clear',
          'logger',
          'mode-toggle',
          'full-screen',
          'tab-insert'
        ]}
        renderHTML={(text) =>
          markdownUtil(text, {
            langToolbar: [],
            langLineNumber: false
          })
        }
        config={{
          htmlClass: htmlClass,
          markdownClass: 'textarea'
        }}
        defaultValue={value}
      />
      <BubblyButton text={submitText} onClick={handleSubmit} />
    </div>
  );
};

/**
 * markdown 编辑器
 * @param {string} initValue 初始值
 * @param {string} submitText 提交按钮文案
 * @param {MarkdownEditType['onSubmit']} onSubmit 提交回调
 * @param {string} htmlClass html容器class
 */
const MarkdownEdit = React.memo(_MarkdownEdit, (pre: MarkdownEditType, next: MarkdownEditType) =>
  isEqual(pre, next)
);

export default MarkdownEdit;
