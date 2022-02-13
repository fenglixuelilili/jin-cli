const exec = require('child_process').exec // 创建子进程处理命令
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')

module.exports = function (){
  co(function *(){
    let telName = yield prompt('模版名称🚚：')
    let projectName = yield prompt('项目名称🚚：')
    // 初始化项目 就是从远程拉下模版 下载到本地
    if( !config[telName] ){
      console.log(chalk.red('不存在的模版，请重试'))
      return process.exit()
    }
    let giturl = config[telName].url
    // 创建git命令 
    const gitCmd = `git clone ${giturl} ${projectName}`
    console.log(chalk.white('\n 正在下载中...'))
    // 执行命令
    exec(gitCmd, (error) => {
      // 执行命令后的回调
      if( error ){
        console.log(error)
        return process.exit()
      }
      console.log(chalk.green('\n 模版下载成功！'))
      console.log(`\n cd ${projectName} && yarn or npm i`)
      process.exit()
    })
  })
}