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

const defaultCln = 'monako__markdown-box ';

const _MarkDown: React.FC<{ text: string; className: string; pictureViewer?: boolean }> = ({
  text = '#### 加载中...',
  className = '',
  pictureViewer = false
}) => {
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
        } else if (target?.tagName === 'PRE') {
          if (!target?.hasAttribute('data-copy')) {
            setClipboard(target.innerText, target);
          }
        }
        target = null;
      }
    },
    [imgList, pictureViewer]
  );

  return (
    <>
      <div
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
