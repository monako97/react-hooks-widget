import React from 'react';
import isFunction from 'lodash/isFunction';
import { VariableSizeGrid } from 'react-window';
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

interface EmojiIconTypes {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  // eslint-disable-next-line no-unused-vars
  data: (value: string) => void;
}

// 列
const columnCount = 10;
// emoji队列
const emoji: EmojiItemTypes[] = [];

for (const key in emojiList) {
  if (Object.prototype.hasOwnProperty.call(emojiList, key)) {
    emoji.push({
      value: emojiList[key],
      label: key
    });
  }
}
// 行
const rowCount = emoji.length / columnCount;
// rem单位 没有就默认16
const remSize = parseInt(document.documentElement.style.fontSize) || 16;

const _EmojiIcon: React.FC<EmojiIconTypes> = ({
  columnIndex,
  rowIndex,
  style,
  data
}: EmojiIconTypes) => {
  const item = emoji[rowIndex * columnCount + columnIndex];

  return (
    <li
      key={item.label}
      className="emoji_container_item"
      style={style}
      onClickCapture={() => data(item.label)}
    >
      {item.value}
    </li>
  );
};

const EmojiIcon = React.memo(_EmojiIcon, () => true);

const _EmojiList: React.FC<EmojiListTypes> = ({ onClick }: EmojiListTypes) => {
  const handleClick = React.useCallback(
    (value: string) => {
      if (isFunction(onClick)) {
        onClick(value);
      }
    },
    [onClick]
  );

  return (
    <VariableSizeGrid
      className="emoji_container"
      innerElementType="ul"
      itemData={handleClick}
      columnCount={columnCount}
      columnWidth={() => 2 * remSize}
      overscanColumnCount={0}
      rowCount={rowCount}
      rowHeight={() => 2 * remSize}
      overscanRowCount={1}
      height={14 * remSize}
      width={20.5 * remSize}
    >
      {EmojiIcon}
    </VariableSizeGrid>
  );
};

const EmojiList = React.memo(_EmojiList, () => true);

export default EmojiList;
