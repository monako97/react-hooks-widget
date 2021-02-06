/* eslint-disable callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const options = {
  '--dir': null
};

require('colors');

// 拷贝文件
function copyFileSync(source, target) {
  let targetFile = target;

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  console.log('copy '.magenta, targetFile.green);
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}
// 拷贝文件夹
function copyFolderRecursiveSync(source, target) {
  let files = [];
  // 检查是否存在文件夹，不存在则创建
  let targetFolder = path.join(target, path.basename(source));

  if (!fs.existsSync(targetFolder)) {
    console.log('create '.magenta, targetFolder.green);
    fs.mkdirSync(targetFolder);
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      let curSource = path.join(source, file);

      if (fs.lstatSync(curSource).isDirectory()) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

function execute(cmd) {
  return new Promise((resolut, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    exec(cmd, function (error, _stdout, _stderr) {
      if (error) {
        reject(error);
      } else {
        resolut('success');
      }
    });
  });
}

function dealScri(arr) {
  if (arr && arr.length) {
    arr.forEach((filepath) => {
      if (options['--lessc']) {
        const pathWithRegex = /\*?\.less/g; // 替换 .less 为 .css
        let fileStr = fs.readFileSync(filepath, 'utf-8');

        if (pathWithRegex.test(fileStr)) {
          console.log('替换.less:'.magenta, filepath);
          fs.writeFileSync(filepath, fileStr.replace(pathWithRegex, '.css'));
        }
      }
      if (options['--terser']) {
        // console.log('terser'.magenta, filepath.cyan, 'Compiling...'.yellow);
        /**
         * -c即compress表示普通的压缩代码
         * pure_funcs表示删除代码中的console.log方法
         * toplevel为true表示只在顶级作用域压缩清理变量
         * -m即mangle会压缩变量名等等
         * -o代表输出路径
         */
        execute(
          `npx terser ${filepath} -c pure_funcs=[console.log],toplevel=true -m -o ${filepath}`
        )
          .then((res) => {
            console.log('terser'.magenta, filepath.cyan, res.green);
          })
          .catch(() => {
            console.log('terser'.red, filepath.yellow, 'error'.red);
          });
      }
    });
  }
}

function walk(dir) {
  let results = [];
  let list = fs.readdirSync(dir);

  list.forEach(function (file) {
    // 排除static静态目录（可按你需求进行新增）
    if (file === 'static') {
      return false;
    }
    // eslint-disable-next-line no-param-reassign
    file = dir + '/' + file;
    let stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      const pathWithRegex = /^.\/src*?\//g; // 以 ./src 开头，以 / 结尾
      const lessRegex = /\*?.less$/g; // 以 .less 结尾
      let outputPath = '';

      switch (path.extname(file)) {
        case '.less':
          if (options['--lessc'] && file.endsWith('index.less')) {
            outputPath = file.replace(pathWithRegex, './lib/').replace(lessRegex, '.css');
            // console.log('lessc:'.magenta, `${outputPath}`.cyan, 'Compiling...'.yellow);
            execute(`npx lessc ${file} > ${outputPath}`)
              .then((res) => {
                console.log('lessc:'.magenta, `${outputPath}`.cyan, `${res}`.green);
                // console.log('postcss:'.magenta, `${outputPath}`.cyan, 'Compiling...'.yellow);
                execute(`npx postcss -c postcss.config.js ${outputPath} -o ${outputPath}`)
                  .then((postCssRes) => {
                    console.log('postcss:'.magenta, `${outputPath}`.cyan, `${postCssRes}`.green);
                  })
                  .catch((postCssRej) => {
                    console.log('postcss:'.magenta, `${outputPath}`.red, `${postCssRej}`.red);
                  });
              })
              .catch((rej) => {
                console.log('lessc:'.magenta, `${outputPath}`.red, `${rej}`.red);
              });
          }
          break;
        case '.js':
          // 过滤后缀名（可按你需求进行新增）
          results.push(path.resolve(__dirname, file));
          break;
        default:
          break;
      }
    }
  });
  return results;
}

const args = process.argv.splice(2);

console.log('所传递的参数是：', args);

args.forEach(function (val) {
  const arg = val.split('=');

  options[arg[0]] = arg[1] || true;
});

if (options['--dir']) {
  dealScri(walk(options['--dir']));
}

if (options['--copy']) {
  copyFolderRecursiveSync(options['--entry'], options['--output']);
}
