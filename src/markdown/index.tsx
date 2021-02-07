import React from 'react';
import { setClipboard } from '@/utils/document';
import { getMarkedImgList, markdownUtil } from '@/utils/markdown-util';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/index.css';
import './index.less';
import isEqual from 'lodash/isEqual';
interface MarkedImageListType {
  ids: number;
  intro: string;
  src: string;
}

type langToolbarType = 'copy';
interface MarkdownProps {
  text: string;
  className: string;
  pictureViewer: boolean;
  langLineNumber?: boolean;
  langToolbar?: langToolbarType[] | null;
}

const defaultCln = 'neko__markdown-box ';

/**
 * MarkDown
 * @param {string} text md内容
 * @param {string} className 容器类名
 * @param {boolean} pictureViewer 开启图片查看器
 * @param {MarkDownProps.langLineNumber} langLineNumber 显示代码块行号
 * @param {MarkDownProps.langToolbar} langToolbar 开启代码块工具条
 * @returns {Element} ReactNode
 */
const _Markdown: React.FC<MarkdownProps> = ({
  text = '#### 加载中...',
  className = '',
  pictureViewer = false,
  langLineNumber = true,
  langToolbar = ['copy']
}: MarkdownProps): React.ReactElement<unknown, React.FC<MarkdownProps>> => {
  const [cln, setCln] = React.useState(defaultCln);
  const [visible, setVisible] = React.useState(false);
  const [photoIndex, setPhotoIndex] = React.useState(0);
  const [htmlString, setHtmlString] = React.useState<string>('');
  const [imgList, setImgList] = React.useState<MarkedImageListType[] | null>([]);

  React.useMemo(() => {
    setCln(defaultCln.concat(className));
  }, [className]);

  React.useMemo(() => {
    setHtmlString(
      markdownUtil(text, {
        langLineNumber: langLineNumber,
        langToolbar: langToolbar
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  let _lineTimer: number | null | undefined;

  React.useEffect(() => {
    if (typeof _lineTimer === 'number') window.clearTimeout(_lineTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    _lineTimer = window.setTimeout(() => {
      window.Prism.highlightAll();
      if (typeof _lineTimer === 'number') window.clearTimeout(_lineTimer);
      _lineTimer = null;
    }, 0);
    if (pictureViewer) {
      setImgList(getMarkedImgList(htmlString));
    }
    return () => {
      if (typeof _lineTimer === 'number') {
        window.clearTimeout(_lineTimer);
        _lineTimer = null;
      }
    };
  }, [htmlString, pictureViewer]);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      let target: HTMLImageElement | null = event.target as HTMLImageElement;

      if (target?.tagName === 'IMG' && pictureViewer) {
        imgList?.forEach((item) => {
          if (item.intro === target?.alt && item.src === target?.getAttribute('src')) {
            setPhotoIndex(item.ids);
            setVisible(true);
          }
        });
      } else if (target.className.includes('toolbar-copy') && langToolbar?.includes('copy')) {
        if (!target.offsetParent?.hasAttribute('data-copy')) {
          setClipboard((target.offsetParent as HTMLImageElement).innerText, target.offsetParent);
        }
      }
      target = null;
    },
    [imgList, langToolbar, pictureViewer]
  );

  const handleWheel = React.useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    let target: HTMLImageElement | null = event.target as HTMLImageElement;
    let offsetParent = target.offsetParent;

    if (!offsetParent || offsetParent.tagName !== 'PRE') {
      return;
    }
    let rows: HTMLCollectionOf<Element> | null | undefined = offsetParent?.getElementsByClassName(
      'line-numbers-rows'
    );

    if (rows?.length) {
      let codeTag: HTMLElement | null = offsetParent.getElementsByTagName('code')[0];

      if (codeTag.scrollHeight - codeTag.offsetHeight && rows[0].scrollTop !== codeTag.scrollTop) {
        // 可滚动高度大于0
        rows[0].scrollTop = codeTag.scrollTop;
      }
      codeTag = null;
    }
    target = null;
    rows = null;
    offsetParent = null;
  }, []);

  return (
    <>
      <div
        className={cln}
        dangerouslySetInnerHTML={{
          __html: htmlString
        }}
        onClick={handleClick}
        onWheel={handleWheel}
      />
      {pictureViewer && imgList?.length ? (
        <PhotoSlider
          images={imgList}
          visible={visible}
          onClose={() => setVisible(false)}
          index={photoIndex}
          onIndexChange={setPhotoIndex}
        />
      ) : null}
    </>
  );
};

/**
 * MarkDown
 * @param {string} text md内容
 * @param {string} className 容器类名
 * @param {boolean} pictureViewer 开启图片查看器
 * @param {MarkDownProps.langLineNumber} langLineNumber 显示代码块行号
 * @param {MarkDownProps.langToolbar} langToolbar 开启代码块工具条
 * @returns {Element} ReactNode
 */
const Markdown = React.memo(_Markdown, (pre, next) => isEqual(pre, next));

export default Markdown;
