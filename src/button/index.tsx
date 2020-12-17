import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import isFunction from 'lodash/isFunction';
import './index.less';

interface ButtonTypes {
  className?: string;
  children?: ReactNode;
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

const defaultCln = 'monako__button ';
const Button: React.FC<ButtonTypes> = ({
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
  const [cln, setCln] = useState(defaultCln);
  const [animating, setAnimating] = useState(false);
  const handleClick = useCallback(() => {
    setAnimating(false);
    setAnimating(true);
    const animatingTimer = window.setTimeout(() => {
      setAnimating(false);
      window.clearTimeout(animatingTimer);
    }, 500);

    if (isFunction(onClick)) {
      onClick();
    }
  }, [onClick]);

  useMemo(() => {
    setCln(`${animating ? 'monako__button-without ' : ''} ${defaultCln + className}`);
  }, [className, animating]);

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
      className={cln}
      onClick={() => handleClick()}
    >
      {children}
    </button>
  );
};

export default Button;
