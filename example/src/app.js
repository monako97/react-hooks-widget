import React, { useEffect, useMemo, useState } from 'react';
import { render } from 'react-dom';
import { BrowserMockup, Markdown, toast, Button, MarkdownEdit, BackTop, WaveCircle, ProgressBar } from '@/';
import { getDefaultTheme, openPanel } from '@/utils';

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
    // 14a01a2b-b736-473f-a36d-3bd1f3576345 a1ad17f0-782d-4751-a86d-c340a54056bb 9fad4afb-4454-47e5-a1c2-6903ba20c3e1
    ajaxGet('/docs/array.md', function (data) {
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
      <BrowserMockup
        title={`标题标题标题标题标题标题标题标题标题标题标题标题标题标题`}
        theme={theme}
        visible={true}
        className="markdown-demo"
      >
        <div>
          <ProgressBar progress={80} />
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
          dange
            onClick={() => {
              s++;
              toast.success('success');
            }}
          />
          <Button
            children="info"
            onClick={() => {
              s++;
              toast.info('info');
            }}
          />
          <Button
            children="dange"
            onClick={() => {
              s++;
              toast.danger('dange', s % 5 ? -1 : 2000, false);
            }}
          />
          <Button
            type="warning"
            children="warning"
            onClick={() => {
              s++;
              toast.warn('warn', s % 5 ? -1 : 2000, true);
            }}
          />
          <Button
            type="primary"
            children="primary"
            onClick={() => {
              s++;
              toast.primary('primary', s % 5 ? -1 : 2000, true);
            }}
          />

    <MarkdownEdit htmlClass="neko__markdown-box" />
          <Markdown text={`
\`\`\`jsx
function proxyHOC(WrappedComponent) {
  return class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}
\`\`\`
### match-braces
\`\`\`javascript match-braces rainbow-braces
(defun factorial (n)
  (if (= n 0) 1
    (* n (factorial (- n 1)))))
\`\`\`
### treeview
\`\`\`treeview
root_folder/
|-- a first folder/
|   |-- holidays.mov
|   |-- javascript-file.js
|   \`-- some_picture.jpg
|-- documents/
|   |-- spreadsheet.xls
|   |-- manual.pdf
|   |-- document.docx
|   \`-- presentation.ppt
|       \`-- test
|-- empty_folder/
|-- going deeper/
|   |-- going deeper/
|   |   \`-- going deeper/
|   |        \`-- going deeper/
|   |            \`-- .secret_file
|   |-- style.css
|   \`-- index.html
|-- music and movies/
|   |-- great-song.mp3
|   |-- S01E02.new.episode.avi
|   |-- S01E02.new.episode.nfo
|   \`-- track 1.cda
|-- .gitignore
|-- .htaccess
|-- .npmignore
|-- archive 1.zip
|-- archive 2.tar.gz
|-- logo.svg
\`-- README.md
\`\`\`
### treeview
\`\`\`less
@import url(https://fonts.googleapis.com/css?family=Questrial);
@import url(https://fonts.googleapis.com/css?family=Arvo);

@font-face {
	src: url(https://lea.verou.me/logo.otf);
	font-family: 'LeaVerou';
}
\`\`\`
\`\`\`diff-javascript
@@ -4,6 +4,5 @@
-    let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
+    const foo = bar.baz([1, 2, 3]) + 1;
     console.log(\`foo: \${foo}\`);
\`\`\`

The C# code will be highlighted __after__ the rest of this document.

\`\`\`csharp
public class Foo : IBar<int> {
	public string Baz { get; set; } = "foo";
}
\`\`\`

The CSS code will be highlighted with this document because CSS has already been loaded.

\`\`\`css
a:hover {
	color: green !important;
}
span.bar {
	background: rgba(105, 0, 12, .38);
	color: hsl(30, 100%, 50%);
	border-color: transparent;
}
\`\`\`
\`\`\`stylus
gradient = linear-gradient(135deg, #9dd53a 0%, #a1d54f 50%, #80c217 51%, #7cbc0a 100%)
.example-gradient
  background-image: repeating-radial-gradient(circle, rgba(255, 0, 0, 0), rgba(255, 0, 0, 1) 10px, rgba(255, 0, 0, 0) 20px)
  angle = 357deg
.example-angle
  transform: rotate(100grad)
  color = olive
.example-color
  color: #000
  easing = ease-in
.example-easing
  transition-timing-function: ease-out
  time = 3s
.example-time
  transition-duration: 0.5s
\`\`\`
\`\`\`shell
# xxx
$ npm run stylelint:fix
$ ls
\`\`\`
\`\`\`sql
> select from * table where id=3;
\`\`\`
\`\`\`typescript
import React, { useEffect, useMemo, useState } from 'react';

new Date();

let timer = new Date();

timer.getTime();

interface Iterable {
  [Symbol.iterator]() : Iterator,
}

interface Iterator {
  next(value?: any) : IterationResult,
}
/* PrismJS 1.23.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+abap+abnf+actionscript+ada+agda+al+antlr4+apacheconf+apex+apl+applescript+aql+arduino+arff+asciidoc+aspnet+asm6502+autohotkey+autoit+bash+basic+batch+bbcode+birb+bison+bnf+brainfuck+brightscript+bro+bsl+c+csharp+cpp+chaiscript+cil+clojure+cmake+coffeescript+concurnas+csp+crystal+css-extras+cypher+d+dart+dataweave+dax+dhall+diff+django+dns-zone-file+docker+dot+ebnf+editorconfig+eiffel+ejs+elixir+elm+etlua+erb+erlang+excel-formula+fsharp+factor+firestore-security-rules+flow+fortran+ftl+gml+gcode+gdscript+gedcom+gherkin+git+glsl+go+graphql+groovy+haml+handlebars+haskell+haxe+hcl+hlsl+http+hpkp+hsts+ichigojam+icon+ignore+inform7+ini+io+j+java+javadoc+javadoclike+javastacktrace+jolie+jq+jsdoc+js-extras+json+json5+jsonp+jsstacktrace+js-templates+julia+keyman+kotlin+latex+latte+less+lilypond+liquid+lisp+livescript+llvm+lolcode+lua+makefile+markdown+markup-templating+matlab+mel+mizar+mongodb+monkey+moonscript+n1ql+n4js+nand2tetris-hdl+naniscript+nasm+neon+nginx+nim+nix+nsis+objectivec+ocaml+opencl+oz+parigp+parser+pascal+pascaligo+psl+pcaxis+peoplecode+perl+php+phpdoc+php-extras+plsql+powerquery+powershell+processing+prolog+promql+properties+protobuf+pug+puppet+pure+purebasic+purescript+python+q+qml+qore+r+racket+jsx+tsx+reason+regex+renpy+rest+rip+roboconf+robotframework+ruby+rust+sas+sass+scss+scala+scheme+shell-session+smali+smalltalk+smarty+sml+solidity+solution-file+soy+sparql+splunk-spl+sqf+sql+squirrel+stan+iecst+stylus+swift+t4-templating+t4-cs+t4-vb+tap+tcl+tt2+textile+toml+turtle+twig+typescript+typoscript+unrealscript+uri+v+vala+vbnet+velocity+verilog+vhdl+vim+visual-basic+warpscript+wasm+wiki+xeora+xml-doc+xojo+xquery+yaml+yang+zig&plugins=line-highlight+line-numbers+wpd+highlight-keywords+inline-color+previewers */
/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */
const defaultCln = 'monako__markdown-box ';

interface IterationResult {
  value: any,
  done: boolean,
}

\`\`\`
\`\`\`java
import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Enumeration;
import java.util.Properties;
import java.util.Vector;
/**
 * 邮件发送工具类
 * @author monako
 * @Date   2019年6月22日 上午10:34:41
 */
public class MailUtil {
    /**
     * SMTP服务器名，可以从 QQ 邮箱的帮助文档查到
     * 文档地址：https://service.mail.qq.com/cgi-bin/help?subtype=1&no=167&id=28
     * */
    String host = "smtp.qq.com";
    /**
     * SMTP服务器端口号
     * 可以从 QQ 邮箱的帮助文档查到，端口为 465 或 587
     * */
    int port = 587;
    /**
     * 发件人邮箱地址
     * */
    String from = "发件人邮箱地址";
    /**
     * 发件人用户名
     * */
    String username = "发件人用户名";
    /**
     * 发件人密码
     * */
    String password = "发件人密码";
    /**
     * 收件人邮箱地址
     * */
    String to;
    /**
     * 附件文件名
     * */
    String filename = "";
    /**
     * 邮件主题
     * */
    String subject;
    /**
     * 邮件正文
     * */
    String content;
    /**
     * 附件文件集合
     * */
    Vector<String> file = new Vector<>();

    public MailUtil(String to, String subject, String content) {
        this.to = to;
        this.subject = subject;
        this.content = content;
    }

    /**
     * 把主题转为中文 utf8
     * @param strText 字符串
     * @author monako
     */
    public String transferChinese(String strText) {
        try {
            strText = MimeUtility.encodeText(new String(strText.getBytes(),
                    StandardCharsets.UTF_8), "utf-8", "B");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return strText;
    }

    public void attachFile(String fileName) {
        file.addElement(fileName);
    }

    /**
     * 发送邮件，发送成功返回true 失败false
     * @author monako
     */
    public boolean sendMail() {
        // 构造mail session
        Properties props = new Properties();
        // 连接协议
        props.put("mail.transport.protocol", "smtp");
        // SMTP 服务器名
        props.put("mail.smtp.host", host);
        // 是否需要身份验证
        props.put("mail.smtp.auth", "true");
        // SMTP 服务器端口号
        props.put("mail.smtp.port", port);
        Session session = Session.getDefaultInstance(props,
                new Authenticator() {
                    @Override
                    public PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {
            // 构造MimeMessage 并设定基本的值
            MimeMessage msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(from));

            msg.setRecipients(Message.RecipientType.BCC, InternetAddress.parse(to));
            subject = transferChinese(subject);
            msg.setSubject(subject);

            // 构造Multipart
            Multipart mp = new MimeMultipart();

            // 向Multipart添加正文
            MimeBodyPart mbpContent = new MimeBodyPart();
            mbpContent.setContent(content, "text/html;charset=utf-8");

            // 向MimeMessage添加（Multipart代表正文）
            mp.addBodyPart(mbpContent);

            // 向Multipart添加附件
            Enumeration<String> efile = file.elements();
            while (efile.hasMoreElements()) {

                MimeBodyPart mbpFile = new MimeBodyPart();
                filename = efile.nextElement();
                FileDataSource fds = new FileDataSource(filename);
                mbpFile.setDataHandler(new DataHandler(fds));
                String filename = new String(fds.getName().getBytes(), StandardCharsets.ISO_8859_1);

                mbpFile.setFileName(filename);
                // 向MimeMessage添加（Multipart代表附件）
                mp.addBodyPart(mbpFile);

            }

            file.removeAllElements();
            // 向Multipart添加MimeMessage
            msg.setContent(mp);
            msg.setSentDate(new Date());
            msg.saveChanges();

            // 发送邮件
            Transport transport = session.getTransport("smtp");
            transport.connect(host, username, password);
            transport.sendMessage(msg, msg.getAllRecipients());
            transport.close();
        } catch (Exception mex) {
            mex.printStackTrace();
            return false;
        }
        return true;
    }
}
\`\`\`
      \n ` + md + `\n 
\`\`\`css
.hljs-selector-class {
  margin: 0 55px;
  --hljs-title: #be4678;
  color: #be4678;
  border-color: var(--hljs-title);
}
\`\`\`
`} pictureViewer
          />
          <BackTop target={() => {
            try {
              return document.getElementsByClassName('markdown-demo')[0].getElementsByClassName('neko__browser--mockup--body')[0];
            } catch (error) {
              // return null;
            }
          }}/>
        </div>
      </BrowserMockup>
      <WaveCircle
        bgColor="pink"
        style={{
          width: 100,
          height: 100,
          position: 'fixed'
        }} />
    </div>
      <BackTop children={"TOP"} className="cs" />
      </>
  );
};
render(<App />, document.getElementById('root'));
