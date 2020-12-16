import marked, { Renderer } from 'marked';
import hljs from 'highlight.js';

const escapedText = (text: string): string => text.toLowerCase().replace(/[^\w]+/g, '-');
const tocObj = {
  add: function (anchor: string, text: string, level: number) {
    this.toc.push({ anchor, level, text } as never);
    return anchor;
  },
  // 使用堆栈的方式处理嵌套的ul,li，level即ul的嵌套层次，1是最外层
  toHTML: function () {
    const levelStack: number[] = [];
    let result = '';
    const addStartUL = () => {
      result += '<ul class="monako__markdown-toc">';
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

marked.setOptions({
  renderer: new Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code: string) {
    return hljs.highlightAuto(code).value;
  }
});

class MyRenderer extends Renderer {
  heading(text: string, level: number) {
    const _text = escapedText(text) + `${++tocObj.index}`;

    tocObj.add(_text, text, level);
    return `<h${level} id="${_text}">
              ${text}
            </h${level}>`;
  }
}

marked.use({ renderer: new MyRenderer() });

const markdownUtil = (text = ''): string => {
  const mt = marked(text);

  return tocObj.toHTML() + `<div>${mt}</div>`;
};

export default markdownUtil;
