const path = require("path");
const Creator = require("./Creator");

module.exports = async function (projectName, options) {
  // 获取当前工作目录
  const cwd = process.cwd();
  // 拼接得到项目目录
  const targetDirectory = path.join(cwd, projectName);
  //  创建实例，并且调用create方法
  const creator = new Creator(projectName, targetDirectory);
  await creator.checkDirectory(options);
  await creator.create();
};
