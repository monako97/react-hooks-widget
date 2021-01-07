import marked, { MarkedOptions, Renderer } from 'marked-completed';

class MyRenderer extends Renderer {
  image(href: string, title: string, text: string) {
    return `<img src="${href}" alt="${text}" title="${title || text}"/>`;
  }
}

marked.setOptions({
  renderer: new MyRenderer(),
  highlight: function (code: string, lang: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const hljs = require('highlight.js');

    if (hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value;
    }
    return hljs.highlightAuto(code).value;
  },
  headerPrefix: '# ',
  tables: true, // 支持支持github表格语法。该选项要求 gfm 为true。
  breaks: true, // 支持github回车换行。该选项要求 gfm 为true
  pedantic: false, // 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  smartLists: true, // 使用比原生markdown更优雅的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
  smartypants: true, // 使用更为优雅的标点，比如在引用语法中加入破折号。
  xhtml: true
} as MarkedOptions);

/**
 * Markdown to Html
 * @param {string} text Markdown文本
 * @returns {string} Html文本
 */
const markdownUtil = (text: string): string => {
  return marked(text);
};

export default markdownUtil;
