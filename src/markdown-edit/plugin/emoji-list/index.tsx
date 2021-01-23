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
const columnCount = 9;
// 行
const showRowCount = 7;
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
// 总行
const rowCount = emoji.length / columnCount;
// rem单位 没有就默认16
const remSize = parseInt(document.documentElement.style.fontSize) || 16;
// 每个单元格size
const columnWidth = 2 * remSize;
const rowHeight = 2 * remSize;
// 容器高度
const boxHeight = showRowCount * rowHeight;
const boxWidth = columnCount * columnWidth + 0.5 * remSize;
// TIMER
let timer: number | undefined;
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
      data-emoji={item.value}
      style={style}
      onClickCapture={() => data(item.label)}
      onMouseEnter={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        let targetElement: HTMLElement | null = event.target as HTMLElement;
        let parentElement = targetElement?.parentElement;
        let scrollTop: number | null = parentElement?.parentElement?.scrollTop || 0;
        let scrollLeft: number | null = parentElement?.parentElement?.scrollLeft || 0;
        let posiCol: string | null =
          targetElement?.offsetLeft / columnWidth >= columnCount / 2 ? 'right' : 'left';
        let posiRow: string | null =
          (targetElement?.offsetTop - scrollTop) / rowHeight >= showRowCount / 2 ? 'bottom' : 'up';
        let moreTop: number | null = posiRow === 'bottom' ? boxHeight - 4.75 * remSize : 0;
        let moreLeft: number | null = posiCol === 'left' ? boxWidth - 5 * remSize : 0;

        parentElement?.style.setProperty('--preview-emoji-top', scrollTop + moreTop + 'px');
        parentElement?.style.setProperty('--preview-emoji-left', scrollLeft + moreLeft + 'px');
        parentElement?.setAttribute('preview-emoji', item.value);
        parentElement?.setAttribute('preview-emoji-position', posiRow + posiCol);
        targetElement = null;
        parentElement = null;
        scrollTop = null;
        scrollLeft = null;
        moreTop = null;
        moreLeft = null;
        posiCol = null;
        posiRow = null;
      }}
      onMouseOut={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          (event.target as HTMLElement)?.parentElement?.removeAttribute('preview-emoji');
          window.clearTimeout(timer);
        }, 1000);
      }}
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
      columnWidth={() => columnWidth}
      overscanColumnCount={0}
      rowCount={rowCount}
      rowHeight={() => rowHeight}
      overscanRowCount={1}
      height={boxHeight}
      width={boxWidth}
    >
      {EmojiIcon}
    </VariableSizeGrid>
  );
};

const EmojiList = React.memo(_EmojiList, () => true);

export default EmojiList;
