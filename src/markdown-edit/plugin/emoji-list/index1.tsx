import { isEqual, isFunction } from 'lodash';
import React, { useEffect } from 'react';
import emojiList from './emoji';
import './index.less';

interface EmojiItemTypes {
  value: string;
  label: string;
}

interface EmojiListTypes {
  // eslint-disable-next-line no-unused-vars
  onClick: (item: string) => void;
}

interface EmojiActivePosition {
  row: number;
  col: number;
}

function getSize(size: number) {
  let fontSize = document.documentElement.style.fontSize || '16px';

  if (fontSize === '') {
    fontSize = '16px';
  }
  // const fontSize = document.documentElement.style.fontSize || '16px';

  return parseFloat(fontSize) * size;
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  ctx.closePath();
  ctx.fill();
  // ctx.lineWidth = 0.5;
  // ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
  // ctx.stroke();
}

// 获取鼠标指针坐标
function getMousePos(evt: { clientX: number; clientY: number }, cvs: HTMLElement) {
  const rect = cvs.getBoundingClientRect();

  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

const list = Object.keys(emojiList);

const _EmojiList: React.FC<EmojiListTypes> = ({ onClick }: EmojiListTypes) => {
  let cvs: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  // 选中的emoji
  let activeEmoji: EmojiItemTypes | null = null;
  // 指针所在的位置
  let activePosi: EmojiActivePosition;
  // 最大显示行
  const maxShowCol = 8,
    // 最大显示列
    maxShowRow = 8;
  // 滚动的位置
  let scrollY = 0,
    // 指针在滚动条区
    activeIsScroll = false,
    // 按下滚动条
    poiIsScroll = false,
    // 最大滚动距离
    maxScrollY: number,
    // 按下滚动条时的位置
    startPoiY: number;
  // 滚动条size
  const scrollSize = {
    w: 10,
    h: 0,
    // 滚动条可动距离
    movable: 0
  };
  const [unitWidth] = React.useState(getSize(2));

  const draw = (active?: EmojiActivePosition): void => {
    // console.time('draw cvs');

    if (ctx) {
      maxScrollY = 0;
      activeEmoji = null;
      cvs.width = unitWidth * maxShowRow + scrollSize.w;
      cvs.height = unitWidth * maxShowCol;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.font = '1rem sans-serif';
      ctx.textAlign = 'center';
      // 第一行
      let y = 0;
      // 开始显示的行数

      const startCol = Math.round(-scrollY / unitWidth);
      const startItem = startCol * maxShowRow;

      for (let i = startItem, len = maxShowCol * maxShowRow + startItem; i < len; i++) {
        // 当前是第几行
        const col = Math.floor(i / maxShowCol);
        const row = Math.floor(i % maxShowRow);
        const x = row * unitWidth;

        y = col * unitWidth + getSize(1.5) + scrollY;
        if (emojiList[list[i]]) {
          if (active && row === active.row && col === active.col + startCol) {
            ctx.fillStyle = 'rgba(0,0,0,0.15)';
            roundedRect(ctx, x, y - getSize(1.375), unitWidth, unitWidth, 5);
            // ctx.font = '1.5rem sans-serif';
            ctx.closePath();
            activeEmoji = {
              value: emojiList[list[i]],
              label: list[i]
            };
          }
          ctx.fillStyle = 'rgba(0,0,0,1)';
          ctx.fillText(emojiList[list[i]], x + 0.5 * unitWidth, y, unitWidth);
          ctx.closePath();
        }
      }
      if (activeEmoji && active) {
        let preViewX = unitWidth * (maxShowRow - 2),
          preViewY = 0,
          shadowY = unitWidth * 6.5;
        const posiCol = active.col >= maxShowCol / 2 ? 'bottom' : 'up';
        const posiRow = active.row >= maxShowRow / 2 ? 'right' : 'left';

        switch ([posiCol, posiRow].join()) {
          case 'up,left':
            preViewX = unitWidth * (maxShowRow - 2);
            preViewY = 0;
            shadowY = unitWidth * 6.5;
            break;
          case 'up,right':
            preViewX = 0;
            preViewY = 0;
            shadowY = unitWidth * 6.5;
            break;
          case 'bottom,left':
            preViewX = unitWidth * (maxShowRow - 2);
            preViewY = unitWidth * (maxShowCol - 2);
            shadowY = unitWidth * 20;
            break;
          case 'bottom,right':
            preViewX = 0;
            preViewY = unitWidth * (maxShowCol - 2);
            shadowY = unitWidth * 20;
            break;
          default:
            break;
        }
        ctx.clearRect(preViewX, preViewY, unitWidth * 2, unitWidth * 2);
        ctx.font = '3rem sans-serif';
        ctx.fillText(
          activeEmoji.value,
          preViewX + unitWidth,
          preViewY + unitWidth * 1.5,
          unitWidth * 2
        );
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        // 倒影
        ctx.scale(1, -0.3);
        ctx.fillText(activeEmoji.value, preViewX + unitWidth, -preViewY - shadowY, unitWidth * 2);
        ctx.closePath();
      }
      maxScrollY = (list.length / maxShowRow - (maxShowRow - 2)) * unitWidth;

      // 指针在滚动条
      if (activePosi?.row >= maxShowRow && active) {
        activeIsScroll = true;
        ctx.fillStyle = 'rgba(130,130,130,0.5)';
      } else {
        ctx.fillStyle = 'rgba(190, 190, 190, 0.4)';
      }
      // 滚动条size
      scrollSize.h = (cvs.height / maxScrollY) * cvs.height;
      scrollSize.movable = cvs.height - scrollSize.h;
      // 滚动条位置
      const scrollPosi = {
        x: cvs.width - scrollSize.w,
        y: (-scrollY / maxScrollY) * scrollSize.movable
      };

      ctx.fillRect(scrollPosi.x, scrollPosi.y, scrollSize.w, scrollSize.h);
    }

    // console.timeEnd('draw cvs');
  };

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = React.useCallback(() => {
    if (isFunction(onClick) && activeEmoji) {
      onClick(activeEmoji.label);
    }
  }, [activeEmoji, onClick]);

  const handleClickDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (activeIsScroll) {
      const mousePos = getMousePos(event, cvs);

      startPoiY = mousePos.y;
      poiIsScroll = true;
    }
  };

  const handleClickUp = () => {
    poiIsScroll = false;
    activeIsScroll = false;
  };

  const handleMouseWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    let ls = 0;
    // 步进
    const step = Math.abs(event.deltaY / 16);
    // 步进动画
    const steppingAnimation = () => {
      ls += step;
      if (event.deltaY > 0) {
        // up
        scrollY -= step;
        // scrollY -= unitWidth;
      } else if (event.deltaY < 0) {
        // scrollY += unitWidth;
        scrollY += step;
      }
      if (scrollY > 0) {
        scrollY = 0;
      }
      if (scrollY < -maxScrollY) {
        scrollY = -maxScrollY;
      }
      draw();
      if (ls < Math.abs(event.deltaY)) {
        window.requestAnimationFrame(() => steppingAnimation());
      } else {
        scrollY = scrollY - (scrollY % unitWidth);
        draw();
      }
    };

    window.requestAnimationFrame(() => steppingAnimation());
  };

  const handleMouseOut = () => {
    activeEmoji = null;
    poiIsScroll = false;
    activeIsScroll = false;
    activePosi = {
      row: -1,
      col: -1
    };
    draw();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const mousePos = getMousePos(event, cvs);

    if (activeIsScroll && poiIsScroll) {
      // 滚动条可动区域高度
      const _scrollY = -((mousePos.y - startPoiY) / scrollSize.movable) * maxScrollY;
      const _startY = -(startPoiY / scrollSize.movable) * maxScrollY;

      scrollY = _scrollY + _startY;
      if (scrollY > 0) {
        scrollY = 0;
      }
      if (scrollY < -maxScrollY) {
        scrollY = -maxScrollY;
      }
      draw();
    } else {
      // if (ctx?.isPointInPath(mousePos.x, mousePos.y)) {
      // console.log(mousePos);
      const _active = {
        row: Math.floor(mousePos.x / unitWidth),
        col: Math.floor(mousePos.y / unitWidth)
      };

      // activeIsScroll = false;
      if (!isEqual(activePosi, _active)) {
        activePosi = _active;
        // 重绘
        draw(activePosi);
      }
      // }
    }
  };

  return (
    <canvas
      ref={(instance) => {
        cvs = instance as HTMLCanvasElement;
        ctx = cvs.getContext('2d');
      }}
      style={{
        display: 'block'
      }}
      onClickCapture={handleClick}
      onMouseDown={handleClickDown}
      onMouseUp={handleClickUp}
      onWheelCapture={handleMouseWheel}
      onMouseOutCapture={handleMouseOut}
      onMouseMoveCapture={handleMouseMove}
    />
  );
};

const EmojiList = React.memo(_EmojiList, () => true);

export default EmojiList;
