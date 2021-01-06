import React, { useCallback, useMemo, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import marked from 'marked-completed';
import Editor from 'react-markdown-editor-lite';
import Sub from './plugin/sub';
import Sup from './plugin/sup';
import Emoji from './plugin/emoji';
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import './index.less';
import { BubblyButton } from '../bubbly-button';

interface MarkDownEditType {
  initValue?: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (value: string) => void;
  htmlClass?: string;
}

Editor.use(Sub);
Editor.use(Sup);
Editor.use(Emoji);

const _MarkDownEdit: React.FC<MarkDownEditType> = ({
  initValue,
  onSubmit,
  htmlClass
}: MarkDownEditType) => {
  const [value, setValue] = useState('');
  const mdEditor = useRef<Editor>(null);

  useMemo(() => {
    if (initValue) setValue(initValue);
  }, [initValue]);

  const handleSubmit = useCallback(() => {
    if (isFunction(onSubmit)) {
      onSubmit(mdEditor.current?.getMdValue() || '');
    }
  }, [onSubmit]);

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
          'block-quote',
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
        renderHTML={(text) => marked(text, { breaks: true })}
        config={{
          htmlClass: htmlClass,
          markdownClass: 'textarea'
        }}
        defaultValue={value}
      />
      <BubblyButton text="提交" onClick={handleSubmit} />
    </div>
  );
};

export const MarkDownEdit = React.memo(
  _MarkDownEdit,
  (pre: MarkDownEditType, next: MarkDownEditType) => {
    return isEqual(pre, next);
  }
);
