import marked, { MarkedOptions, Renderer } from 'marked';

interface MarkedOption extends MarkedOptions {
  toc: boolean;
}

const escapedText = (text: string): string => text.toLowerCase().replace(/[^\w]+/g, '-');
const tocObj = {
  add: function (anchor: string, text: string, level: number) {
    this.toc.push({ anchor, level, text } as never);
    return anchor;
  },
  // 使用堆栈的方式处理嵌套的ul,li，level即ul的嵌套层次，1是最外层
  toHTML: function () {
    const levelStack: number[] = [];
    const hei = -(this.index + 2) * 1.5 + 'rem';
    let result = '';

    const addStartUL = () => {
      if (!result.trim().length) {
        result += `<ul style="--toc-height: ${hei};" class="monako__markdown-toc">`;
      } else {
        result += `<ul>`;
      }
    };
    const addEndUL = () => {
      result += '</ul>\n';
    };
    const addLI = (anchor: string, text: string) => {
      result += '<li><a href="#' + anchor + '">' + text + '</a></li>\n';
    };

    this.toc.forEach(function (item: { level: number; anchor: string; text: string }) {
      let levelIndex = levelStack.indexOf(item.level);
      // 没有找到相应level的ul标签，则将li放入新增的ul中

      if (levelIndex === -1) {
        levelStack.unshift(item.level);
        addStartUL();
        addLI(item.anchor, item.text);
      } // 找到了相应level的ul标签，并且在栈顶的位置则直接将li放在此ul下
      else if (levelIndex === 0) {
        addLI(item.anchor, item.text);
      } // 找到了相应level的ul标签，但是不在栈顶位置，需要将之前的所有level出栈并且打上闭合标签，最后新增li
      else {
        while (levelIndex--) {
          levelStack.shift();
          addEndUL();
        }
        addLI(item.anchor, item.text);
      }
    });
    // 如果栈中还有level，全部出栈打上闭合标签
    while (levelStack.length) {
      levelStack.shift();
      addEndUL();
    }
    // 清理先前数据供下次使用
    this.toc = [];
    this.index = 0;
    return result;
  },
  toc: [],
  index: 0
};

class MyRenderer extends Renderer {
  heading(text: string, level: number) {
    const { toc } = this.options as MarkedOption;
    let _text = '';

    if (toc) {
      _text = escapedText(text) + `${++tocObj.index}`;
      tocObj.add(_text, text, level);
    }
    return `<h${level} id="${_text}">
              ${text}
            </h${level}>`;
  }
}

marked.setOptions({
  renderer: new MyRenderer(),
  highlight: function (code, lang) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const hljs = require('highlight.js');
    const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';

    return hljs.highlight(validLanguage, code).value;
  },
  gfm: true, // 允许 GitHub标准的markdown.
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
const markdownUtil = (text: string): void | string => {
  // 是否包含目录
  const toc = text.startsWith('[TOC]');

  return marked(text.replace('[TOC]', ''), { toc } as MarkedOption, (error, result) => {
    if (error) {
      return '<h2>读取失败！！！</h2>';
    }

    if (toc) {
      return tocObj.toHTML() + result;
    }
    return result;
  });
};

export default markdownUtil;
