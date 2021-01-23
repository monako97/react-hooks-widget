import marked from 'marked-completed';
import { entityToString } from './document';

marked.setOptions({
  highlight: function (code: string, lang: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const hljs = require('highlight.js');

    if (hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value;
    }
    return hljs.highlightAuto(code).value;
  },
  headerPrefix: '# ',
  breaks: true, // 支持github回车换行。该选项要求 gfm 为true
  pedantic: false, // 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  smartLists: true, // 使用比原生markdown更优雅的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
  smartypants: true, // 使用更为优雅的标点，比如在引用语法中加入破折号。
  xhtml: true
});

/**
 * Markdown to Html
 * @param {string} text Markdown文本
 * @returns {string} Html文本
 */
export const markdownUtil = (text: string): string => {
  return marked(text);
};

interface MarkedImageListType {
  ids: number;
  intro: string;
  src: string;
}
/**
 * 提取md图片src
 * @param {string} text HTML string
 * @returns {MarkedImageListType[]} 链接list
 */
export const getMarkedImgList = (text: string): MarkedImageListType[] | null => {
  if (!text) return null;
  let imageList = text.match(/role=('|")dialog('|") src=('|")(.+?)alt=('|")(.+?)('|")/g);
  const imageArr = [];

  if (imageList) {
    for (let i = 0, len = imageList.length; i < len; i++) {
      let params: URLSearchParams | null = new URLSearchParams(
        entityToString(
          imageList[i].replace(/('|")/g, '').replace(/ src=/, '&src=').replace(/ alt=/, '&alt=')
        )
      );

      imageArr.push({
        ids: i,
        intro: params.get('alt') || '',
        src: params.get('src') || ''
      });
      params = null;
    }
  }
  imageList = null;
  return imageArr;
};
