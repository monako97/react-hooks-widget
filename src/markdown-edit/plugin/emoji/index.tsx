import React from 'react';
import Editor, { DropList } from 'react-markdown-editor-lite';
import EmojiList from '../emoji-list';
import './index.less';

interface EmojiProps {
  editor: Editor;
}

interface EmojiTypes extends React.FC<EmojiProps> {
  align: 'left' | 'right';
  pluginName: string;
}

const Emoji: EmojiTypes = ({ editor }: EmojiProps) => {
  const [show, setShow] = React.useState<boolean>(false);
  const handleShow = React.useCallback((flag: boolean) => {
    setShow(flag);
  }, []);

  const handleClick = (value: string) => {
    const offset = 2 + value.length;

    editor.insertText(':' + value + ':', false, {
      start: offset,
      end: offset
    });
  };

  return (
    <span
      className={`button button-type-emoji monako__icon`}
      // title="Emoji表情"
      onMouseEnter={() => handleShow(true)}
      onMouseLeave={() => handleShow(false)}
    >
      <DropList show={show} onClose={() => handleShow(false)}>
        <EmojiList onClick={handleClick} />
      </DropList>
    </span>
  );
};

Emoji.align = 'left';
Emoji.pluginName = 'emoji';

export default Emoji;
