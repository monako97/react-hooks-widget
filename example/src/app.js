import React, { useEffect, useMemo, useState } from 'react';
import { render } from 'react-dom';
import { BrowserMockup, MarkDown, toast, Button, MarkDownEdit, BackTop } from '../../src';
import { getDefaultTheme, openPanel } from '../../src/utils';

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
    ajaxGet('/static_file/markdown/142a5ca9-1426-4370-8f34-43c4db3761c0.md', function (data) {
      setMD(data);
    });
  }, []);
  useEffect(() => {
    window.addEventListener('dblclick', function (e) {
      if (e.target.tagName === 'PRE') {
        openPanel(
          <BrowserMockup
            style={{
              width: 400,
              height: 500
            }}
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
    <div style={{
      padding: '30px'
    }}>
    <MarkDownEdit initValue={md} htmlClass="monako__markdown-box" onSubmit={(value) => {
      console.log(value);
    }}/>
    <MarkDownEdit />
    <MarkDownEdit />
    <MarkDownEdit />
    <MarkDownEdit />
      <BrowserMockup
        title={`标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题`}
        theme={theme}
        visible={Boolean(md)}
        className="markdown-demo"
      >
        <div>
          <Button
            dashed
            ghost
            dange
            round
            onClick={() => {
              setTheme(theme === 'light' ? 'night' : 'light');
            }}
          >
            {theme}
          </Button>

          <Button
            type="primary"
            children="primary"
            onClick={() => {
              s++;
              toast.primary('primary', s % 5 ? -1 : 2000, true);
            }}
          />
          <MarkDown text={md} pictureViewer />
          <BackTop target={() => {
            try {
              return document.getElementsByClassName('markdown-demo')[0].getElementsByClassName('monako__browser--mockup--body')[0];
            } catch (error) {
              // return null;
            }
          }}/>
        </div>
      </BrowserMockup>
      {/* <WaveCircle
        bgColor="pink"
        style={{
          width: 100,
          height: 100
        }}
      >
        <span style={{ color: 'white', textAlign: 'center' }}>哈哈哈/</span>
      </WaveCircle> */}
    </div>
      <BackTop children={"TOP"} className="cs" />
      </>
  );
};
render(<App />, document.getElementById('root'));
