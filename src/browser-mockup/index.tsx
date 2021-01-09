import React from 'react';
import getDefaultTheme from '../utils/get-default-theme';
import getMaxZIndex from '../utils/get-max-zIndex';
import isEqual from 'lodash/isEqual';
import './index.less';
interface ThemeTypes {
  type: 'light' | 'night';
}
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
  const browser = React.useRef<HTMLDivElement | null>(null);
  // 显示
  const [show, setShow] = React.useState<boolean | number | null>(visible);
  // 第一次渲染
  const [init, setInit] = React.useState<boolean>(false);
  // 开始拖拽
  const [isDrag, setIsDrag] = React.useState<boolean>(false);
  // 拖拽中
  const [dragIng, setDragIng] = React.useState<boolean>(false);
  // 偏移像素
  const [poi, setPoi] = React.useState<DefaultOffsetType>({ left: 0, top: 0 });
  // 初始偏移像素
  const [offset, setOffset] = React.useState<DefaultOffsetType>({ left: 0, top: 0 });
  // 上一次的偏移量
  const [prePoi, setPrePoi] = React.useState<DefaultOffsetType>({ left: 0, top: 0 });
  // 最大z-index
  const [zIndex, setZIndex] = React.useState<number | null>(1);
  // 判断传入是否为 React 元素
  const [isValidElement, setIsValidElement] = React.useState<boolean>(
    React.isValidElement(children)
  );
  // 设置全屏
  const [screen, setScreen] = React.useState<'window' | 'minimize' | 'fullscreen'>('window');

  // 获取最大z-index
  const getMaxZInde = () => {
    const maxZIndex: number = getMaxZIndex();

    // 不是最高层
    setZIndex(maxZIndex + 1);
  };

  // 按下拖拽部分，开始拖动
  const onMouseDown = React.useCallback((event) => {
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
  const onMouseMove = React.useCallback(
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
  const onMouseEnd = React.useCallback(
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

  // 关闭 缩小 放大
  const handleScreen = React.useCallback(
    (type) => {
      if (type === 'close') {
        setShow(false);
        return;
      }
      const _type = screen === type ? 'window' : type;

      if (_type === 'fullscreen') {
        // z移到最上层
        getMaxZInde();
      }
      setScreen(_type);
    },
    [screen]
  );

  React.useMemo(() => {
    setIsValidElement(React.isValidElement(children));
  }, [children]);

  // 监听传入的 visible 以改变show
  React.useMemo(() => {
    if (!visible && !show) return;
    setShow(visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  React.useEffect(() => {
    if (!isValidElement) {
      // 判断传入的 节点 是否已存在
      const containChild =
        children === browser.current ? false : browser.current?.contains(children as Node);

      if (!containChild && children) {
        browser.current?.appendChild(children as Node);
      }
    }
  }, [children, isValidElement]);

  // 监听传入的 keyName 变化时更新
  React.useEffect(() => {
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
  React.useEffect(() => {
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

  React.useEffect(() => {
    getMaxZInde();
  }, []);

  return show !== null ? (
    <div
      ui-theme={theme}
      className={`monako__browser--mockup${fixed ? ` monako__browser--mockup--fixed` : ''}${
        className ? ' ' + className : ''
      }${show ? '' : ` monako__browser--mockup--out`}`}
      style={
        {
          ...style,
          transform: `translate3d(${poi.left}px, ${poi.top}px, 1px) perspective(1px) translateZ(0)`,
          zIndex: zIndex,
          '--transform-drag': `translate3d(${poi.left}px, ${poi.top}px, 1px) perspective(1px) translateZ(0)`
        } as React.CSSProperties
      }
      data-draging={dragIng}
      data-fullscreen={screen}
      onMouseDownCapture={onMouseDown}
      onMouseMoveCapture={onMouseMove}
      onMouseUpCapture={onMouseEnd}
      onMouseOutCapture={onMouseEnd}
      onTouchStartCapture={onMouseDown}
      onTouchMoveCapture={onMouseMove}
      onTouchEndCapture={onMouseEnd}
      onTouchCancelCapture={onMouseEnd}
    >
      <div className={'monako__browser--mockup--title'}>
        <div className="monako__browser--mockup--title--left">
          <i
            className="monako__browser--mockup--close"
            onClickCapture={() => handleScreen('close')}
          />
          <i
            className="monako__browser--mockup--minimize"
            // m-drag={screen === 'minimize' ? 'true' : null}
            onClickCapture={() => handleScreen('minimize')}
          />
          <i
            className="monako__browser--mockup--fullscreen"
            onClickCapture={() => handleScreen('fullscreen')}
          />
        </div>
        <h4 m-drag="true" title={title}>
          {title}
        </h4>
        <div className={'monako__browser--mockup--tool'}>
          <i className={'copy'} />
          <i className={'theme'} />
        </div>
      </div>
      <div ref={browser}>{isValidElement && children}</div>
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
