import React from 'react';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';
import './index.less';

interface ButtonTypes {
  className?: string;
  children?: React.ReactNode;
  infinite?: boolean;
  type?: 'default' | 'primary' | 'warning';
  ghost?: boolean;
  dange?: boolean;
  dashed?: boolean;
  round?: boolean;
  circle?: boolean;
  size?: 'small' | 'default';
  onClick?: () => void;
}

const defaultCln = 'neko__button ';
const _Button: React.FC<ButtonTypes> = ({
  className = '',
  children = '按钮',
  type = 'default',
  infinite,
  ghost,
  dange,
  dashed,
  round,
  size,
  circle,
  onClick
}: ButtonTypes) => {
  let animTimer: number | undefined;
  const [cln, setCln] = React.useState(defaultCln);
  const [animating, setAnimating] = React.useState(false);

  const handleClick = () => {
    setAnimating(false);
    window.clearTimeout(animTimer);
    animTimer = window.setTimeout(() => {
      setAnimating(false);
      window.clearTimeout(animTimer);
    }, 300);
    setAnimating(true);
    if (isFunction(onClick)) {
      onClick();
    }
  };

  React.useMemo(() => {
    if (className) setCln(defaultCln + className);
  }, [className]);

  React.useEffect(() => {
    return () => {
      // 清除
      window.clearTimeout(animTimer);
    };
  }, [animTimer]);

  return (
    <button
      type="button"
      data-infinite={infinite}
      data-type={type}
      data-dange={dange}
      data-ghost={ghost}
      data-dashed={dashed}
      data-round={round}
      data-circle={circle}
      data-size={size}
      data-without={animating}
      className={cln}
      onClick={() => handleClick()}
    >
      {children}
    </button>
  );
};

/**
 * @param {string} className 类名
 * @param {ReactNode} children 内容
 * @param {boolean} infinite 是否开启循环动画
 * @param {default | primary | warning} type 按钮类型
 * @param {boolean} ghost 幽灵按钮
 * @param {boolean} dange 危险
 * @param {boolean} dashed 虚线
 * @param {boolean} round 开启圆角
 * @param {boolean} circle 圆形按钮
 * @param {small | default} size 按钮尺寸
 * @param {Function} onClick 点击回调方法
 * @returns {Button} Button
 * @example
 * <Button dange onClick={() => {
 *    console.log('click');
 * }}>Dange</Button>
 */
const Button = React.memo(_Button, (pre, next) => {
  return isEqual(
    { ...pre, onClick: pre.onClick?.toString() },
    { ...next, onClick: next.onClick?.toString() }
  );
});

export default Button;
