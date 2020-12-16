import React, { useEffect, useMemo, useState } from 'react';
import { render } from 'react-dom';
import { BrowserMockup, MarkDown, toast, WaveCircle } from '../../src';
import getDefaultTheme from '../../src/utils/get-default-theme';
import openPanel from '../../src/utils/open-panel';

function ajaxGet(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseText);
    }
  };
}

let s = 1;

const App = () => {
  const [theme, setTheme] = useState(getDefaultTheme());
  const [md, setMD] = useState();
  useMemo(() => {
    ajaxGet('/docs/proxy.md', function (data) {
      setMD(data);
    });
  }, []);
  useEffect(() => {
    window.addEventListener('dblclick', function (e) {
      if (e.target.tagName === 'PRE') {
        openPanel(
          <BrowserMockup
            title={e.target.tagName}
            theme={theme}
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
      <BrowserMockup title="标题" theme={theme}>
        <div>
          <button
            onClick={() => {
              setTheme(theme === 'light' ? 'night' : 'light');
            }}
          >
            {theme}
          </button>
          <MarkDown text={md} />
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
