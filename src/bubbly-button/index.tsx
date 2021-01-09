import React from 'react';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import './index.less';

interface BubblyButtonProps {
  text: string;
  onClick?: () => void;
}

const _BubblyButton: React.FC<BubblyButtonProps> = function ({
  text = 'Submit',
  onClick
}: BubblyButtonProps) {
  const [clsName, setClsName] = React.useState<string>('bubbly_button');
  let _timer = -1000;

  const animateButton = React.useCallback(() => {
    if (_timer !== -1000) {
      return;
    }
    setClsName('bubbly_button');
    setClsName(`bubbly_button animate`);
    if (isFunction(onClick)) {
      onClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    _timer = window.setTimeout(function () {
      window.clearTimeout(_timer);
      setClsName('bubbly_button');
      _timer = -1000;
    }, 700);
  }, [onClick]);

  return (
    <button className={clsName} onClick={() => animateButton()}>
      {text}
    </button>
  );
};

export const BubblyButton = React.memo(_BubblyButton, (pre, next) => isEqual(pre, next));
