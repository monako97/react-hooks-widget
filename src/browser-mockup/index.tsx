import React, { useState, useCallback, useEffect, useMemo } from 'react';
import getDefaultTheme from '../utils/get-default-theme';
import getMaxZIndex from '../utils/get-max-zIndex';
import isEqual from 'lodash/isEqual';
import './index.less';

interface DefaultOffsetType {
  left: number;
  top: number;
}

interface BrowserMockupProps {
  keyName?: string;
  className?: string;
  theme?: ThemeTypes['type'];
  fixed?: boolean;
  visible?: boolean;
  style?: React.CSSProperties;
  title?: string;
  children?: React.ReactNode | Node;
}

const _BrowserMockup: React.FC<BrowserMockupProps> = ({
  keyName,
  className,
  theme = getDefaultTheme(),
  fixed = true,
  visible = true,
  style = {},
  title = '',
  children = <p style={{ textAlign: 'center', margin: 0 }}>无内容</p>
}: BrowserMockupProps) => {
  // 显示
  const [show, setShow] = useState<boolean | number | null>(visible);
  // 第一次渲染
  const [init, setInit] = useState<boolean>(false);
  // 开始拖拽
  const [isDrag, setIsDrag] = useState<boolean>(false);
  // 拖拽中
  const [dragIng, setDragIng] = useState<boolean>(false);
  // 偏移像素
  const [poi, setPoi] = useState<DefaultOffsetType>({ left: 0, top: 0 });
  // 初始偏移像素
  const [offset, setOffset] = useState<DefaultOffsetType>({ left: 0, top: 0 });
  // 上一次的偏移量
  const [prePoi, setPrePoi] = useState<DefaultOffsetType>({ left: 0, top: 0 });
  // 最大z-index
  const [zIndex, setZIndex] = useState<number | null>(1);
  // 判断传入是否为 React 元素
  const [isValidElement, setIsValidElement] = useState<boolean>(React.isValidElement(children));

  // 获取最大z-index
  const getMaxZInde = () => {
    const maxZIndex: number = getMaxZIndex();

    // 不是最高层
    setZIndex(maxZIndex + 1);
  };

  // 按下拖拽部分，开始拖动
  const onMouseDown = useCallback((event) => {
    // 触屏
    if ('ontouchstart' in window && event.type === 'mousedown') return;
    let _event = window.event || event;
    let target = _event.srcElement || _event.target || _event.currentTarget;

    if (target?.getAttribute('m-drag')) {
      const top: number = _event.pageY || _event.clientY || _event.changedTouches[0].pageY;
      const left: number = _event.pageX || _event.clientX || _event.changedTouches[0].pageX;

      // z移到最上层
      getMaxZInde();
      // touch的初始偏移量
      setOffset({ left, top });
      // 开启拖动
      setIsDrag(true);
    }
    _event = null;
    target = null;
  }, []);

  // 拖动位置
  const onMouseMove = useCallback(
    (event) => {
      if (isDrag) {
        setDragIng(true);
        let _event = window.event || event;
        const pageY: number = _event.pageY || _event.clientY || _event.changedTouches[0].pageY;
        const pageX: number = _event.pageX || _event.clientX || _event.changedTouches[0].pageX;
        const top: number = pageY - offset.top + prePoi.top;
        const left: number = pageX - offset.left + prePoi.left;

        setPoi({ left, top });
        _event = null;
      }
    },
    [isDrag, offset, prePoi]
  );

  // 结束拖拽
  const onMouseEnd = useCallback(
    (event) => {
      // 触屏
      if ('ontouchstart' in window && event.type === 'mouseup') return;
      if (isDrag) {
        // 保存偏移量
        const _poiEnd = poi;

        // 解决 transform 子级模糊
        if (_poiEnd.left % 2) {
          _poiEnd.left = poi.left + 1;
        }
        if (_poiEnd.top % 2) {
          _poiEnd.top = poi.top + 1;
        }
        setPoi(_poiEnd);
        setPrePoi(_poiEnd);
        // 关闭拖拽
        setIsDrag(false);
        setDragIng(false);
        // 重置初始偏移量
        setOffset({ left: 0, top: 0 });
      }
    },
    [isDrag, poi]
  );

  // 单击
  const onClose = useCallback((event) => {
    let _event = window.event || event;
    let target = _event.srcElement || _event.target || _event.currentTarget;

    if (target?.getAttribute('m-close')) {
      const top: number = _event.pageY || _event.clientY || _event.changedTouches[0].pageY;
      const left: number = _event.pageX || _event.clientX || _event.changedTouches[0].pageX;

      const lefts = left - target.offsetLeft > 18 && left - target.offsetLeft < 23;

      console.log({ left: lefts, top: top, offsetTop: target.offsetTop });
    }

    _event = null;
    target = null;
  }, []);

  // 关闭
  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  useMemo(() => {
    setIsValidElement(React.isValidElement(children));
  }, [children]);

  // 监听传入的 visible 以改变show
  useMemo(() => {
    if (!visible && !show) return;
    setShow(visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // 监听传入的 keyName 变化时更新
  useEffect(() => {
    let timers: number | undefined;

    if (init && keyName && visible) {
      if (!(!visible && !show)) {
        if (show !== null) {
          setShow(0);
          timers = window.setTimeout(() => {
            window.clearTimeout(timers);
            setShow(visible);
          }, 300);
        } else {
          setShow(visible);
        }
      }
    }
    return () => {
      window.clearTimeout(timers);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyName]);

  // 监听 show，为 null 时卸载 Dom
  useEffect(() => {
    let timer: number | undefined;

    if (init) {
      if (show === false) {
        timer = window.setTimeout(() => {
          setShow(null);
          window.clearTimeout(timer);
        }, 300);
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

  useEffect(() => {
    getMaxZInde();
  }, []);

  const refChild = useCallback(
    (instance) => {
      if (instance && !isValidElement) {
        // 判断传入的 节点 是否已存在
        const containChild = children === instance ? false : instance.contains(children);

        if (!containChild) {
          instance.appendChild(children);
        }
      }
    },
    [children, isValidElement]
  );

  return show !== null ? (
    <div
      ui-theme={theme}
      m-drag="true"
      m-close="true"
      className={`monako__browser--mockup${fixed ? ` monako__browser--mockup--fixed` : ''}${
        className ? ' ' + className : ''
      }${dragIng ? ` monako__browser--mockup--drag` : ''}${
        show ? '' : ` monako__browser--mockup--out`
      }`}
      style={
        {
          ...style,
          transform: `translate3d(${poi.left}px, ${poi.top}px, 1px) perspective(1px) translateZ(0)`,
          zIndex: zIndex,
          '--transform-drag': `translate3d(${poi.left}px, ${poi.top}px, 1px) perspective(1px) translateZ(0)`
        } as React.CSSProperties
      }
      data-title={title}
      onMouseDownCapture={onMouseDown}
      onMouseMoveCapture={onMouseMove}
      onMouseUpCapture={onMouseEnd}
      onMouseOutCapture={onMouseEnd}
      onTouchStartCapture={onMouseDown}
      onTouchMoveCapture={onMouseMove}
      onTouchEndCapture={onMouseEnd}
      onTouchCancelCapture={onMouseEnd}
      onClick={onClose}
      ref={(instance) => {
        if (!isValidElement) refChild(instance);
      }}
    >
      {/* <div className={'monako__browser--mockup--title'}>
        <i className={'monako__browser--mockup--close'} onClickCapture={() => handleClose()} />
      </div> */}
      <i className={'monako__browser--mockup--close'} onClickCapture={() => handleClose()} />
      {isValidElement && children}
    </div>
  ) : null;
};

/**
 * BrowserMockup: 浏览器窗口模型
 * @constructor
 * @param {string} keyName                   - key.
 * @param {string} className                 - 自定义类名.
 * @param {'light' | 'night'} theme          - 风格.
 * @param {boolean} fixed                    - 使用固定定位.
 * @param {boolean} visible                  - 是否显示.
 * @param {React.CSSProperties} style        - 样式.
 * @param {React.ReactNode} children         - ReactNode.
 * @example
 * ``` js
 * <BrowserMockup
 *    className={'demo'}
 *    style={{ width: 500 }}
 *    fixed>
 * Demo
 * </BrowserMockup>
 * ```
 */
const BrowserMockup = React.memo(_BrowserMockup, (pre, next) => {
  return isEqual(pre, next);
});

export default BrowserMockup;
