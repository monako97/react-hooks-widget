import React from 'react';
import isUndefined from 'lodash/isUndefined';
import './index.less';
import { getMaxZindex } from '../utils';
import { isFunction } from 'lodash';

interface BackTopTypes {
  className?: string;
  target?: () => HTMLElement;
  children?: React.ReactNode;
}

/**
 * 获取滚动条距离顶端的距离
 * @param {HTMLElement} ele HTMLElement
 * @return {Number} scrollTop
 */
export const getScrollTop = (ele?: HTMLElement): number => {
  if (ele) {
    return ele.scrollTop;
  } else if (!isUndefined(window.pageXOffset)) {
    return window.pageYOffset;
  } else if ((document.compatMode || '') === 'CSS1Compat') {
    return document.documentElement.scrollTop;
  }
  return document.body.scrollTop;
};

const _BackTop: React.FC<BackTopTypes> = ({ children, target, className }: BackTopTypes) => {
  // 显示
  const [show, setShow] = React.useState<boolean | number | null>(null);
  // 第一次渲染
  const [init, setInit] = React.useState<boolean>(false);
  // 最大z-index
  const [zindex, setZindex] = React.useState<number | undefined>(getMaxZindex());
  const handleScrollY = React.useCallback(() => {
    // 当前滚动位置
    let scrollTop: number | null = 0;
    // 内容高度
    let offsetHeight: number | null = 0;

    if (isFunction(target)) {
      let ele: HTMLElement | null = target();

      if (ele) {
        scrollTop = getScrollTop(ele);
        offsetHeight = ele.offsetHeight;
      }
      ele = null;
    } else {
      scrollTop = getScrollTop();
      offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
    }
    let _nextShow: boolean | null = scrollTop > offsetHeight / 4;

    if (Boolean(show) !== _nextShow) {
      setShow(_nextShow);
    }
    scrollTop = null;
    offsetHeight = null;
    _nextShow = null;
  }, [show, target]);

  const handleClick = React.useCallback(() => {
    if (isFunction(target)) {
      target().scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [target]);

  // 监听 show，为 null 时卸载 Dom
  React.useEffect(() => {
    let timer: number | undefined;

    if (show) {
      setZindex(getMaxZindex());
    }
    if (init) {
      if (show === false) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timer = window.setTimeout(() => {
          setShow(null);
          window.clearTimeout(timer);
        }, 1000);
      }
    } else {
      if (show === false) {
        setShow(null);
      }
      setInit(true);
    }
    return () => {
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  React.useEffect(() => {
    if (isFunction(target)) {
      target().addEventListener('scroll', handleScrollY, false);
    } else {
      window.addEventListener('scroll', handleScrollY, false);
    }
    return () => {
      if (isFunction(target)) {
        target().removeEventListener('scroll', handleScrollY, false);
      } else {
        window.removeEventListener('scroll', handleScrollY, false);
      }
    };
  }, [handleScrollY, target]);

  const classNames = ['back-top', className, show ? '' : 'back-top--out'].join(' ');

  return show !== null ? (
    <div
      className={classNames}
      title="回到顶部"
      style={{
        zIndex: zindex
      }}
      onClick={() => handleClick()}
    >
      {children}
    </div>
  ) : null;
};

/**
 * 返回顶部
 * @param {BackTopTypes['className']} className 类名
 * @param {BackTopTypes['target']} target 返回 HTMLElement 的方法
 * @param {BackTopTypes['children']} children children
 */
export const BackTop = React.memo(_BackTop, () => true);
