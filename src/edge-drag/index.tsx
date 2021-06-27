import React, { useCallback, useEffect, useState } from 'react';
import isFunction from 'lodash/isFunction';
import './index.less';

interface EdgeDragPropType {
  type?: 'horizontal' | 'vertical';
  // eslint-disable-next-line no-unused-vars
  onChange?: (size: number) => void;
  position?: 'left' | 'top' | 'right' | 'bottom';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const EdgeDrag: React.FC<EdgeDragPropType> = ({
  onChange,
  type = 'horizontal',
  position,
  children,
  className,
  style
}: EdgeDragPropType) => {
  const [resize, setResize] = useState(false);
  const [size, setSize] = useState(0);
  const [startSize, setStartSize] = useState(0);
  const [parentEl, setParentEl] = useState<HTMLDivElement>();
  const [cursor] = useState(type === 'vertical' ? 'row-resize' : 'col-resize');
  let updatePlayerTimer: number | null | undefined;
  const onMouseDown = useCallback(
    (e) => {
      if (!e.target.getAttribute('data-drag')) {
        return;
      }
      setParentEl(e.target);
      const parent = e.target.getBoundingClientRect();
      let parentSize = parent.width;
      let _startSize = e.pageX;

      if (type === 'vertical') {
        parentSize = parent.height;
        _startSize = e.pageY;
      }

      setResize(true);
      setSize(parentSize);
      setStartSize(_startSize);
      document.documentElement.style.cursor = cursor;
      document.documentElement.style.userSelect = 'none';
    },
    [cursor, type]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (resize && parentEl) {
        if (typeof updatePlayerTimer == 'number') {
          window.clearTimeout(updatePlayerTimer);
        }
        let pointSize = e.pageY - startSize;
        let _size = 0;

        if (type === 'vertical') {
          pointSize = -(e.pageY - startSize);
          _size = size + pointSize;

          if (_size < 0) {
            _size = 0;
          }
          parentEl.style.height = _size + 'px';
        } else if (type === 'horizontal') {
          if (position === 'left') {
            pointSize = -(e.pageX - startSize);
          } else {
            pointSize = e.pageX - startSize;
          }
          _size = size + pointSize;

          if (_size < 0) {
            _size = 0;
          }
          parentEl.style.width = _size + 'px';
        }
        if (isFunction(onChange)) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          updatePlayerTimer = window.setTimeout(() => {
            if (typeof updatePlayerTimer == 'number') {
              window.clearTimeout(updatePlayerTimer);
            }
            updatePlayerTimer = null;
            onChange(_size);
          }, 8);
        }
      }
    },
    [resize, size, startSize, onChange, updatePlayerTimer, parentEl, position]
  );

  const onMouseUp = useCallback(
    (e) => {
      if (resize) {
        setResize(false);
        setStartSize(e.pageY);
      }
      document.documentElement.style.cursor = '';
      document.documentElement.style.userSelect = '';
    },
    [resize]
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mouseup', onMouseUp, false);
    window.addEventListener('blur', onMouseUp, false);
    return () => {
      window.removeEventListener('mousemove', onMouseMove, false);
      window.removeEventListener('mouseup', onMouseUp, false);
      window.removeEventListener('blur', onMouseUp, false);
      if (typeof updatePlayerTimer == 'number') {
        window.clearTimeout(updatePlayerTimer);
      }
    };
  }, [onMouseMove, onMouseUp, updatePlayerTimer]);

  return (
    <div
      className={`edge-drag ${className ? className : ''}`}
      style={style}
      data-type={type}
      data-position={position}
      onMouseDown={onMouseDown}
      data-drag={resize}
    >
      {children}
    </div>
  );
};

export default EdgeDrag;
