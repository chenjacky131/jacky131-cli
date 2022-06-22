#! /usr/bin/env node
const { program } = require("commander");

program.name('jc-cli').usage(`<command> [option]`)
program.version('1.0.0')
program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action((projectName, cmd) => {
    // 引入 create 模块，并传入参数
    require("../lib/create")(projectName, cmd);
  });
  program
  .command("config [value]") // config 命令
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys);
  });

// 监听 --help 指令
program.on("--help", function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    " Run jc-cli <command> --help for detailed usage of given command."
  );
  console.log();
});

//  去掉了好像获取不到参数
program.parse(process.argv)
