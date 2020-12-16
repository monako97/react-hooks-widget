module.exports = {
  // 指定代码的运行环境
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // 定义文件继承的子规范
  extends: [
    'eslint:recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  // 定义ESLint的解析器
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'latest'
    }
  },
  // 定义了该eslint文件所依赖的插件
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'no-array-constructor': 2, // 禁止使用数组构造器
    'no-catch-shadow': 2, // 禁止catch子句参数与外部作用域变量同名
    'no-class-assign': 2, // 禁止给类赋值
    'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
    'no-console': 1, // 禁止使用console
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-constant-condition': 2, // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-control-regex': 2, // 禁止在正则表达式中使用控制字符
    'no-debugger': 2, // 禁止使用debugger
    'no-delete-var': 2, // 不能对var声明的变量使用delete操作符
    'no-div-regex': 1, // 不能使用看起来像除法的正则表达式/=foo/
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-args': 2, // 函数参数不能重复
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'no-else-return': 2, // 如果if语句里面有return,后面不能跟else语句
    'no-empty': 2, // 块语句中的内容不能为空
    'no-empty-character-class': 2, // 正则表达式中的[]内容不能为空
    'no-eq-null': 2, // 禁止对null使用==或!=运算符
    'no-ex-assign': 2, // 禁止给catch语句中的异常参数赋值
    'no-extend-native': 2, // 禁止扩展native对象
    'no-extra-bind': 2, // 禁止不必要的函数绑定
    'no-extra-boolean-cast': 2, // 禁止不必要的bool转换
    'no-extra-semi': 2, // 禁止多余的冒号
    'no-floating-decimal': 2, // 禁止省略浮点数中的0 .5 3.
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-implied-eval': 2, // 禁止使用隐式eval
    'no-inner-declarations': [2, 'functions'], // 禁止在块语句中使用声明（变量或函数）
    'no-invalid-regexp': 2, // 禁止无效的正则表达式
    'no-invalid-this': 2, // 禁止无效的this，只能用在构造器，类，对象字面量
    'no-irregular-whitespace': 2, // 不能有不规则的空格
    'no-iterator': 2, // 禁止使用__iterator__ 属性
    'no-label-var': 2, // label名不能与var声明的变量名相同
    'no-labels': 2, // 禁止标签声明
    'no-lone-blocks': 2, // 禁止不必要的嵌套块
    'no-lonely-if': 2, // 禁止else语句内只有if语句
    'no-mixed-spaces-and-tabs': [2, false], // 禁止混用tab和空格
    'no-multi-str': 2, // 字符串不能用\换行
    'no-multiple-empty-lines': [1, { max: 2 }], // 空行最多不能超过2行
    'no-native-reassign': 2, // 不能重写native对象
    'no-negated-in-lhs': 2, // in 操作符的左边不能有!
    'no-new-object': 2, // 禁止使用new Object()
    'no-new-require': 2, // 禁止使用new require
    'no-new-wrappers': 2, // 禁止使用new创建包装实例，new String new Boolean new Number
    'no-obj-calls': 2, // 不能调用内置的全局对象，比如Math() JSON()
    'no-octal': 2, // 禁止使用八进制数字
    'no-octal-escape': 2, // 禁止使用八进制转义序列
    'no-param-reassign': 2, // 禁止给参数重新赋值
    'no-proto': 2, // 禁止使用__proto__属性
    'no-redeclare': 2, // 禁止重复声明变量
    'no-regex-spaces': 2, // 禁止在正则表达式字面量中使用多个空格 /foo bar/
    'no-self-compare': 2, // 不能比较自身
    'no-shadow': 2, // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    'no-shadow-restricted-names': 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
    'no-sparse-arrays': 2, // 禁止稀疏数组， [1,,2]
    'no-throw-literal': 2, // 禁止抛出字面量错误 throw "error";
    'no-undef-init': 2, // 变量初始化时不能直接给它赋值为undefined
    'no-undefined': 2, // 不能使用undefined
    'no-unexpected-multiline': 2, // 避免多行表达式
    'no-unneeded-ternary': 2, // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    'no-unreachable': 2, // 不能有无法执行的代码
    'no-unused-expressions': 2, // 禁止无用的表达式
    'no-unused-vars': [2, { vars: 'all', args: 'after-used' }], // 不能有声明后未被使用的变量或参数
    'no-useless-call': 2, // 禁止不必要的call和apply
    'no-void': 2, // 禁用void操作符
    'no-with': 2, // 禁用with
    'array-bracket-spacing': [2, 'never'], // 是否允许非空数组里面有多余的空格
    'comma-style': [2, 'last'], // 逗号风格，换行时在行首还是行尾
    'consistent-this': [2, 'that'], // this别名
    'default-case': 2, // switch语句最后必须有default
    'new-cap': 2, // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    'new-parens': 2, // new时必须加小括号
    'newline-after-var': [2, 'always'], // 变量声明后是否需要空一行
    'operator-linebreak': [2, 'after'], // 换行时运算符在行尾还是行首
    'id-match': 1, // 命名检测
    'use-isnan': 2, // 禁止比较时使用NaN，只能用isNaN()
    'valid-typeof': 2, // 必须使用合法的typeof的值
    'vars-on-top': 2, // var必须放在作用域顶部
    'wrap-iife': [2, 'inside'], // 立即执行函数表达式的小括号风格
    'no-var': 2, // 禁用var，用let和const代替
    'no-alert': 2, // 禁止使用alert confirm prompt
    '@typescript-eslint/no-use-before-define': 2, // 未定义前不能使用
    'no-warning-comments': [1, { terms: ['todo', 'fixme', 'xxx'], location: 'start' }], // 不能有警告备注
    'arrow-parens': 1, // 箭头函数用小括号括起来
    'arrow-spacing': 2, // =>的前/后括号
    'comma-spacing': 2, // 逗号前后的空格
    'callback-return': 1, // 避免多次调用回调什么的
    'dot-notation': [2, { allowKeywords: true }], // 避免不必要的方括号
    'guard-for-in': 2, // for in循环要用if语句过滤
    'spaced-comment': 2, // 注释风格要不要有空格什么的
    'valid-jsdoc': 2, // jsdoc规则
    'wrap-regex': 2 // 正则表达式字面量用小括号包起来
  }
};
