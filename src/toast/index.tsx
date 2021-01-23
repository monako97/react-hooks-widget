import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { getMaxZindex } from '../utils/document';
import './index.less';

interface NoticeType {
  type: 'info' | 'success' | 'danger' | 'loading' | 'warning' | 'primary';
  content: string;
}
interface ToastProps {
  notice: NoticeType;
  duration: number;
  parentNode: HTMLDivElement;
  panelBox: HTMLElement;
  close: boolean;
}

const icons: Record<NoticeType['type'], string> = {
  loading: '',
  info: 'iconinfo',
  success: 'iconsuccess',
  danger: 'icon14CIRCLE',
  primary: 'iconzan-f',
  warning: 'iconwarning'
};

const Toast: React.FC<ToastProps> = ({
  notice,
  duration,
  close,
  parentNode,
  panelBox
}: ToastProps) => {
  const [show, setShow] = React.useState<boolean>(true);
  const [closeTimer, setCloseTimer] = React.useState<number>();

  const handleColse = React.useCallback(() => {
    window.clearTimeout(closeTimer);
    setShow(false);
    const _timer = window.setTimeout(() => {
      window.clearTimeout(_timer);
      unmountComponentAtNode(parentNode);
      panelBox.removeChild(parentNode);
    }, 300);
  }, [closeTimer, panelBox, parentNode]);

  const closeEvent = React.useCallback(() => {
    return window.setTimeout(() => {
      handleColse();
    }, duration);
  }, [duration, handleColse]);

  React.useEffect(() => {
    // 当 duration 为 -1 时，不自动关闭
    if (duration !== -1) {
      // 执行退场动画
      setCloseTimer(closeEvent());
    }
    return () => {
      window.clearTimeout(closeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${notice.type}${show ? '' : ' react-toast-exit'}`}>
      <i className={'monako__icon '.concat(icons[notice.type])} />
      <strong>{notice.content}</strong>
      {close ? (
        <i className={'monako__icon iconclose close'} onClick={() => handleColse()} />
      ) : null}
    </div>
  );
};

const notice = (
  type: NoticeType['type'],
  content: NoticeType['content'],
  duration = 4000,
  close = false
) => {
  // 检测父容器是否存在
  let panelBox = document.getElementById('@monako__panel--box');
  const isOldPanel = Boolean(panelBox);

  if (!panelBox) {
    panelBox = document.createElement('div');
    panelBox.id = '@monako__panel--box';
    panelBox.style.display = 'contents';
    panelBox.style.position = 'fixed';
  }

  // 创建节点插入到父容器
  const div = document.createElement('div');

  div.className = `react-toast ${type}`;
  div.style.zIndex = getMaxZindex() + 2 + '';
  panelBox.appendChild(div);

  if (!isOldPanel) {
    // 如果是新建的父节点，吧父节点插入到dom
    document.body.appendChild(panelBox);
  }

  render(
    <Toast
      notice={{ content, type }}
      close={close}
      duration={duration}
      parentNode={div}
      panelBox={panelBox}
    />,
    div
  );
};

/**
 * 轻提醒
 * @property {Function} info                   - 默认.
 * @property {Function} success                - 成功.
 * @property {Function} danger                 - 警告.
 * @property {Function} loading                - loading.
 * @property {Function} warn                   - 警告.
 * @example
 * ``` js
 * // 5s后自动消失，显示关闭按钮
 * toast.danger("警告", 5000, true);
 * // 不自动关闭，不显示关闭按钮
 * toast.success("成功", -1);
 * ```
 */
export const toast = {
  /**
   * 信息
   * @constructor
   * @param {string} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   */
  info: (content: string, duration?: number, close?: boolean): void =>
    notice('info', content, duration, close),
  /**
   * 成功
   * @constructor
   * @param {string} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   */
  success: (content: string, duration?: number, close?: boolean): void =>
    notice('success', content, duration, close),
  /**
   * 错误
   * @constructor
   * @param {string} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   */
  danger: (content: string, duration?: number, close?: boolean): void =>
    notice('danger', content, duration, close),
  /**
   * Loading
   * @constructor
   * @param {string} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   */
  loading: (content: string, duration?: number, close?: boolean): void =>
    notice('loading', content, duration, close),
  /**
   * 警告
   * @constructor
   * @param {string} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   */
  warn: (content: string, duration?: number, close?: boolean): void =>
    notice('warning', content, duration, close),
  /**
   * 重要
   * @constructor
   * @param {string} content               - 内容.
   * @param {Number} duration                 - 显示时间.
   * @param {Boolean} close                   - 显示关闭按钮.
   */
  primary: (content: string, duration?: number, close?: boolean): void =>
    notice('primary', content, duration, close)
};
