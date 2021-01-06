import { isFunction } from 'lodash';
import React, { useMemo } from 'react';
import emojiList from './emoji';
import './index.less';

interface EmojiItemTypes {
  value: string;
  label: string;
}

interface EmojiListTypes {
  // eslint-disable-next-line no-unused-vars
  onClick: (value: string) => void;
}

const _EmojiList: React.FC<EmojiListTypes> = ({ onClick }: EmojiListTypes) => {
  const [emoji, setEmoji] = React.useState<EmojiItemTypes[]>([]);

  useMemo(() => {
    const _emoji = [];

    for (const key in emojiList) {
      if (Object.prototype.hasOwnProperty.call(emojiList, key)) {
        _emoji.push({
          value: emojiList[key],
          label: key
        });
      }
    }
    setEmoji(_emoji);
  }, []);

  const handleClick = React.useCallback(
    (value: string) => {
      if (isFunction(onClick)) {
        onClick(value);
      }
    },
    [onClick]
  );

  return (
    <ul className="emoji_container">
      {emoji.map((item) => {
        return (
          <li key={item.label} onClickCapture={() => handleClick(item.label)}>
            {item.value}
          </li>
        );
      })}
    </ul>
  );
};

const EmojiList = React.memo(_EmojiList, () => true);

export default EmojiList;
