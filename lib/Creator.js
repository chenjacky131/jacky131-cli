const chalk = require("chalk");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const ora = require("ora");
const util = require("util");
const downloadGitRepo = require("download-git-repo");

class Creator {
  // 项目名称及项目路径
  constructor(name, target) {
    this.name = name;
    this.target = target;
    // 转化为 promise 方法
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  // 创建项目部分
  async create() {
    await this.download();
    this.printInfo();
  }
  //  检查目录是否存在
  async checkDirectory(options) {
    // 判断目录是否存在;
    if (fs.existsSync(this.target)) {
      // 判断是否使用 --force 参数
      if (options.force) {
        // 删除重名目录(remove是个异步方法)
        await fs.remove(this.target);
      } else {
        let { isOverwrite } = await new Inquirer.prompt([
          // 返回值为promise
          {
            name: "isOverwrite", // 与返回值对应
            type: "list", // list 类型
            message: "Target directory exists, Please choose an action",
            choices: [
              { name: "Overwrite", value: true },
              { name: "Cancel", value: false },
            ],
          },
        ]);
        // 选择 Cancel
        if (!isOverwrite) {
          console.log("Cancel");
          return;
        } else {
          // 选择 Overwirte ，先删除掉原有重名目录
          console.log("\r\nRemoving");
          await fs.remove(this.target);
        }
      }
    }
  }
  async download() {
    // 模板下载地址
    const templateUrl = `github:chenjacky131/vite-vue3-template`;
    // 调用 downloadGitRepo 方法将对应模板下载到指定目录
    await this.loading(
      "downloading template, please wait",
      this.downloadGitRepo,
      templateUrl,
      this.target // 项目创建位置
    );
  }
/**
 * loading加载效果
 * @param {String} message 加载信息
 * @param {Function} fn 加载函数
 * @param {List} args fn 函数执行的参数
 * @returns 异步调用返回值
 */
  async loading(message, fn, ...args) {
    const spinner = ora(message);
    spinner.start(); // 开启加载
    try{
      let executeRes = await fn(...args);
      spinner.succeed();
      return executeRes;
    }catch(error){
      // 加载失败
      spinner.fail("request fail, refetching");
      await this.sleep(1000);
      // 重新拉取
      return this.loading(message, fn, ...args);
    }
  }
  /**
   * 睡觉函数
   * @param {Number} n 睡眠时间
   */
  sleep(n) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, n);
    });
  }
  // 模板使用提示
  printInfo(){
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  yarn install\r\n");
    console.log("  yarn run dev\r\n");
  }
}

module.exports = Creator;