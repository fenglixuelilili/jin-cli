"use strict"
const co = require("co") // 处理异步的
const promopt = require("co-prompt") // 处理用户的输入命令
// const chalk = require('chalk') // 在命令行中写入不同颜色的文字
// 
let chalk
(
  async () => {
    chalk =  await import('chalk')
    chalk = chalk.default
  }
)() // 在命令行中写入不同颜色的文字
// import chalk from 'chalk'
const fs = require('fs')
const config = require('../templates.json')
module.exports = function () {
  co(function *(){
    // 分步骤接受用户的参数
    let tmlName = yield promopt('模版名称: ')
    let githttp = yield promopt('git url连接: ')
    // 网模版json文件中添加数据
    if( !config.tpl[tmlName] ){
      config.tpl[tmlName] = {}
      config.tpl[tmlName]['url'] = githttp.replace(/[\u0000-\u0019]/g, '') // 过滤unicode字符
    } else {
      console.log('模版已经存在')
      // 退出命令
      return process.exit()
    }
    // 往模版中写入数据
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), (err) => {
      if(err) console.log(err)
      // 成功写入
      // console.log(chalk.then(data => {
      //   console.log(data)
      // }))
      console.log(chalk.green('模版创建成功\n'))
      console.log(chalk.green('模版列表是：\n'))
      console.log(config)
      // 退出
      process.exit()
    })
  })
}
