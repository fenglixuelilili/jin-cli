const co = require("co") // 处理异步的
const promopt = require("co-prompt") // 处理用户的输入命令
const config = require('../templates.json')
const chalk = require('chalk') // 在命令行中写入不同颜色的文字
const fs = require('fs')
module.exports = function () {
  co(function *(){
    // 分步骤接受用户的参数
    let tmlName = yield promopt('模版名称: ')
    // 网模版json文件中添加数据
    if( config.tpl[tmlName] ){
      config.tpl[tmlName] = undefined
    } else {
      console.log(chalk.red('模版不存在'))
      // 退出命令
      return process.exit()
    }
    // 往模版中写入数据
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), (err) => {
      if(err) console.log(err)
      // 成功写入
      console.log(chalk.green('模版删除成功\n'))
      // 退出
      process.exit()
    })
  })
}
