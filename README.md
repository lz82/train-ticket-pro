# 前言

使用`create-react-app@3.3.0`脚手架搭建的 react 项目(`react-scripts`的版本也是 3.3.0
同时使用`react-app-rewired`和`customize-cra`扩展配置项
之前使用官方脚手架搭建时，总是喜欢用`eject`的方式去修改`webpack`的配置，这样虽然更容易实现完全个性化，但是最大的弊端是改动的点比较杂乱，倒下个项目又要重头再来一遍，
同时渐渐的发现，其实也并没有那么强的“个性化”需求，所以该模板不再`eject`配置项

## 项目初始化

1. 使用 `yarn create react-app train-ticket-pro`的方式创建名为`train-ticket-pro`的项目，没什么特别的，安装好依赖之后进入项目目录即可

2. 添加`.editorconfig`文件，内容如下:

```
# https://editorconfig.org/
root = true # 当前处于根目录

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
insert_final_newline = false
trim_trailing_whitespace = false
```

3. 添加`.prettierrc.js`,内容如下：

```javascript
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾不要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'none',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
}
```

4. 使用`yarn add react-app-rewired customize-cra@next`安装依赖，同时在项目根目录添加`config-overrides.js`
注意，截止`2019-12-19`,`customize-cra`对新版本的`create-react-app`引用的`webpack`下的`css-loader`支持有问题，在`@next`版本下临时修复了问题
因此可以看到安装`customize-cra`时指定了版本，将来应该不需要做此操作
使用`npm ls webpack`可以看到当前`webpack`版本是4.41.2


5. 使用`yarn add less les-loader`安装`less`依赖，同时在`config-overrides.js`中添加以下代码:
``` javascript
const {
  override,
  addLessLoader,
  addWebpackAlias
} = require('customize-cra')

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

const config = override(
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    modules: true
  }),
  addWebpackAlias({
    '@': resolve("src")
  })
)

module.exports = config
```
上述配置有如下功能：
- 支持less
- 支持css Module
- 为"src"目录起一个别名`@`

6. 使用[alloy team](https://www.npmjs.com/package/eslint-config-alloy)的eslint config
通过`npm ls xxx`命令可以看到`react-scripts`已经集成了`eslint`,因此只需要执行`yarn add eslint-config-alloy`安装这一个依赖即可
随后在项目根目录添加`.eslintrc.js`和`.eslintignore`，内容如下：
``` javascript
module.exports = {
  extends: ['alloy', 'alloy/react'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    //
    // React: false,
    // ReactDOM: false
  },
  rules: {
    // 一个缩进必须用两个空格替代
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    semi: ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // jsx 的 children 缩进必须为两个空格
    'react/jsx-indent': ['error', 2],
    // jsx 的 props 缩进必须为两个空格
    'react/jsx-indent-props': ['error', 2],
    'function-paren-newline': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
```
注意，记得去`package.json`中移除`eslint.config`，这部分个人还是更倾向于放在独立的文件夹
多说一句，以前也喜欢把`.browserslistrc`放在单独的文件，但是昨天看到官方更推荐放在`package.json`中，所以就不移出来了

同时还要去修改`config-overrides.js`,最新的内容如下：
``` javascript
const {
  override,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
  addWebpackAlias
} = require('customize-cra')

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

const config = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    modules: true
  }),
  useEslintRc(),
  addWebpackAlias({
    '@': resolve("src")
  })
)

module.exports = config
```
 按需引入`antd`的部分可以无视，这部分`ant design`官网有详述

7. 使用`yarn add husky`添加钩子函数，并在`package.json`中的`scripts`添加一下两个命令：

```
"lint": "eslint --ext .js --ext .jsx src/  --fix",
"precommit": "yarn lint"
```

这样在每次执行`git commit`的时候都会强制执行lint

8. 在`vs code`中启用`eslint lintOnSave`,值得一提的是，在最新的(1.41.0)`vs code`中,老的配置项被废弃了，最新的`vs code`配置如下：

```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

9. 使用`dotenv`
通过`npm ls dotenv dotenv-expande`可以看到`reac-scripts`已经集成了这两个依赖，
这意味可以在`.env`中使用`REACT_APP_TOKEN=$npm_package_token`来直接读取`package.json`中的变量，当然，也可以读取`dotenv`中的

当打包时有多个环境时，需要先安装`dotenv-cli`,然后再`"build:qa": "dotenv -e .env.qa react-app-rewired build",`以这种形式指定需要使用的`.env`文件