import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserMockup, toast, WaveCircle } from '../../src';
import utils from '../../src/utils';

let s = 1;
const App = () => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    window.addEventListener('dblclick', function (e) {
      if (e.target.tagName === 'PRE') {
        utils.openPanel(
          <BrowserMockup
            title={e.target.tagName}
            theme={theme}
            style={{
              width: 150,
              minWidth: 150
            }}
          >
            {e.target.cloneNode(true)}
          </BrowserMockup>
        );
      }
    });
  }, []);
  return (
    <>
      <input
        type="button"
        value="showToast"
        onClick={() => {
          s++;
          toast.success('abs', s % 5 ? -1 : 2000, true);
        }}
      />
      <BrowserMockup
        title="标题"
        theme={theme}
        style={{
          left: 100,
          top: 100,
          bottom: 'unset',
          right: 'unset'
        }}
      >
        <div>
          <button
            onClick={() => {
              setTheme(theme === 'light' ? 'night' : 'light');
            }}
          >
            {theme}
          </button>
          <pre>
            <code>
              <span>let num = 0;</span>
              <br />
              <span>num++;</span>
              <br />
              <span>console.log(num);</span>
              <br />
              <span>
                var el = document.querySelector(&apos;div.user-panel.main
                input[name=&apos;login&apos;]&apos;);
              </span>
            </code>
          </pre>
        </div>
      </BrowserMockup>
      <WaveCircle
        bgColor="pink"
        style={{
          width: 100,
          height: 100
        }}
      >
        <span style={{ color: 'white', textAlign: 'center' }}>哈哈哈/</span>
      </WaveCircle>
    </>
  );
};
render(<App />, document.getElementById('root'));
