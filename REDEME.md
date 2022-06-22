### package.json 里的 bin 字段

用于执行 **可执行文件** ，当使用 `npm 或 yarn` 命令安装时，如果发现包里有该字段，那么会在 `node_modules` 目录下的 `.bin` 目录中复制 `bin` 字段链接的可执行文件，我们在调用执行文件时，可以不带路径，直接使用命令名来执行相对应的执行文件。

---

### bin 文件里的 `#!` 含义

`#!` 符号的名称叫 Shebang，用于指定脚本的解释程序。

`/usr/bin/env node` 表示 系统可以在 `PATH` 目录中查找 `node` 程序

如果报错，说明没有在 `PATH` 中找到 `node`

---

### npm link

`npm link` 是将整个目录链接到`全局node_modules` 中，如果有 `bin` 那么则会生成**全局的可执行命令**

`npm link xxx` 是将 xxx 链接到 `该目录的node_modules` 中

1. 库在开发迭代，不适合发布到线上进行调试。

2. 可以帮助我们模拟包安装后的状态，它会在系统中做一个快捷方式映射，让本地的包就好像 install 过一样，可以直接使用。

3. 用 `npm unlink ` 解除链接

---

### commander —— 命令行指令配置

实现脚手架命令的配置， [commander 中文文档](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)

```js
// 引入 program
const { program } = require('commander')

// 设置 program 可以输入的选项
// 每个选项可以定义一个短选项名称（-后面接单个字符）和一个长选项名称（--后面接一个或多个单词），使用逗号、空格或|分隔。
// 长选项名称可以作为 .opts() 的对象key
program.option('-p, --port <count>') // 必选参数使用 <> 表示，可选参数使用 [] 表示

// 解析后的选项可以通过Command对象上的.opts()方法获取，同时会被传递给命令处理函数。
const options = program.opts()

program.command('create <name>').action((fileName) => {
  console.log({ fileName, options })
})

program.parse(process.argv)
```

---

### chalk —— 命令行美化工具

可以美化我们在命令行中输出内容的样式，例如实现多种颜色，花里胡哨的命令行提示等。[chalk 文档](https://github.com/chalk/chalk)

**安装 chalk 时一定要注意安装 4.x 版本(小包使用的是 4.0.0)，否则会因为版本过高，爆出错误。**

```js
const chalk = require('chalk')
console.log(`hello ${chalk.blue('world')}`)
console.log(chalk.blue.bgRed.bold('Hello world!'))
```

---

### inquirer —— 命令行交互工具

支持 input, number, confirm, list, rawlist, expand, checkbox, password,editor 等多种交互方式。 [inquirer 文档](https://github.com/SBoudrias/Inquirer.js)

```js
const inquirer = require('inquirer')

inquirer
  .prompt([
    /* 输入问题 */
    {
      name: 'question1',
      type: 'checkbox',
      message: '爸爸的爸爸叫什么？',
      choices: [
        {
          name: '爸爸',
          checked: true
        },
        {
          name: '爷爷'
        }
      ]
    },
    {
      name: 'question2',
      type: 'list',
      message: `确定要创建${fileName}的文件夹吗`,
      choices: [
        {
          name: '确定',
          checked: true
        },
        {
          name: '否'
        }
      ]
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log({ answers })
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })
```

---

### ora —— 命令行 loading 效果

现在的最新版本为 `es6 模块`，需要用以前的版本，例如： `V5.4.1` 才是 `cjs 模块` : [ora 文档](https://github.com/sindresorhus/ora)

```js
const ora = require('ora')

const spinner = ora('Loading unicorns').start()

setTimeout(() => {
  spinner.color = 'yellow'
  spinner.text = 'Loading rainbows'
}, 1000)

spinner.succeed()
```

---

### fs-extra —— 更友好的文件操作

是系统 fs 模块的扩展，提供了更多便利的 API，并继承了 fs 模块的 API。比 fs 使用起来更加友好。 [fs-extra 文档](https://github.com/jprichardson/node-fs-extra)

---

### download-git-repo —— 命令行下载工具

从 git 中拉取仓库，提供了 download 方法，该方法接收 4 个参数。 [download-git-repo 文档](https://gitlab.com/flippidippi/download-git-repo)

```js
/**
 * download-git-repo 源码
 * Download `repo` to `dest` and callback `fn(err)`.
 *
 * @param {String} repo 仓库地址
 * @param {String} dest 仓库下载后存放路径
 * @param {Object} opts 配置参数
 * @param {Function} fn 回调函数
 */

function download(repo, dest, opts, fn) {}
```

> 【注】 `download-git-repo` 不支持 Promise
