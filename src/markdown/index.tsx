import React from 'react';
import { setClipboard } from '../utils/document';
import { getMarkedImgList, markdownUtil } from '../utils/markdown-util';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/index.css';
import './index.less';
interface MarkedImageListType {
  ids: number;
  intro: string;
  src: string;
}

const copyText = (event: MouseEvent) => {
  event.stopImmediatePropagation();
  event.stopPropagation();
  let target: HTMLElement | null = event.target as HTMLElement;

  if (target?.tagName === 'PRE' && !target?.hasAttribute('data-copy')) {
    setClipboard(target.innerText, target);
    target = null;
  }
  return '';
};
const defaultCln = 'monako__markdown-box ';

const _MarkDown: React.FC<{ text: string; className: string; pictureViewer?: boolean }> = ({
  text = '#### 加载中...',
  className = '',
  pictureViewer = false
}) => {
  let mdel: HTMLElement | null = null;
  const [cln, setCln] = React.useState(defaultCln);
  const [visible, setVisible] = React.useState(false);
  const [photoIndex, setPhotoIndex] = React.useState(0);
  const [htmlString, setHtmlString] = React.useState<string>('');
  const [imgList, setImgList] = React.useState<MarkedImageListType[] | null>([]);

  React.useMemo(() => {
    setCln(defaultCln.concat(className));
  }, [className]);

  React.useMemo(() => {
    setHtmlString(markdownUtil(text));
  }, [text]);

  React.useEffect(() => {
    if (pictureViewer) {
      setImgList(getMarkedImgList(htmlString));
    }
  }, [htmlString, pictureViewer]);

  React.useEffect(() => {
    mdel?.querySelectorAll('pre').forEach((pre) => {
      pre.addEventListener('click', copyText, false);
    });

    return () => {
      mdel?.querySelectorAll('pre').forEach((pre) => {
        pre.removeEventListener('click', copyText, false);
      });
    };
  }, [mdel]);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (pictureViewer) {
        let target: HTMLImageElement | null = event.target as HTMLImageElement;

        if (target?.tagName === 'IMG') {
          imgList?.forEach((item) => {
            if (item.intro === target?.alt && item.src === target?.getAttribute('src')) {
              setPhotoIndex(item.ids);
              setVisible(true);
            }
          });
        }
        target = null;
      }
    },
    [imgList, pictureViewer]
  );

  return (
    <>
      <div
        ref={(instance) => (mdel = instance)}
        className={cln}
        dangerouslySetInnerHTML={{
          __html: htmlString
        }}
        onClick={handleClick}
      />
      {pictureViewer && imgList?.length && (
        <PhotoSlider
          images={imgList}
          visible={visible}
          onClose={() => setVisible(false)}
          index={photoIndex}
          onIndexChange={setPhotoIndex}
        />
      )}
    </>
  );
};

/**
 * MarkDown
 * @param {string} text md内容
 * @param {string} className 容器类名
 * @returns {React.FC} ReactNode
 */
export const MarkDown = React.memo(_MarkDown, (pre, next) => {
  return pre.text === next.text && pre.className === next.className;
});
