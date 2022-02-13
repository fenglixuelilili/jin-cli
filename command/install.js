"use strict"
const exec = require('child_process').exec
const co = require("co") // 处理异步的
const promopt = require("co-prompt") // 处理用户的输入命令
const fs = require('fs')
const path = require('path')
const { complete, modular }  = require('../config')
const completeKeys = Object.keys(complete)
const modularKeys = Object.keys(modular)

let chalk
(
  async () => {
    chalk =  await import('chalk')
    chalk = chalk.default
  }
)()

module.exports = function (cmd) {
  co(function *(){
    // 分步骤接受用户的参数
    let tmlName = cmd
    let gitUrl
    if( ![ ...completeKeys, ...modularKeys ].includes(tmlName) ){
      console.error('下载模版或者模块不存在, 执行 jin-cli ls 查看所有模版和模块 ！')
      return process.exit()
    }
    if( completeKeys.includes(tmlName) ){
      // 处理模版
      let projectName = yield promopt('请输入scss项目名称: ')
      if( !projectName ){
        console.log(chalk.green('项目名称不存在！'))
        return process.exit()
      }
      console.log('模版下载中，请稍后...')
      let cloneurl = complete[tmlName].url
      gitUrl = `git clone ${cloneurl} ${projectName}`
      // 执行命令
      exec(gitUrl, (err) => {
        if( err ){
          console.log(err)
          return process.exit()
        }
        console.log(chalk.green(`\n cd ${projectName}`))
        console.log(chalk.green('\n yarn add or npm install'))
        console.log(chalk.green('\n npm run dev'))
        return process.exit()
      })
    }
    if( modularKeys.includes(tmlName) ){
      // 处理模块
      fs.stat(path.join(process.cwd(), 'src/modules'), (err) => {
        if( err ){
          console.log('\n 请检查当前目录中的src/modules是否存在！ \n')
          return process.exit()
        }
        fs.stat(path.join(process.cwd(), `src/modules/${tmlName}`), (e) => {
          if( !e ){
            console.log(`\n ${tmlName}模块已经存在！ \n`)
            return process.exit()
          }
          console.log(`\n ${tmlName}模块正在下载中，请稍等...! \n`)
          let cloneurl = modular[tmlName].url
          gitUrl = `cd src/modules && git clone ${cloneurl} ${tmlName} && cd ../ && cd ../`
          exec(gitUrl, (err) => {
            if( err ){
              console.log(err)
              return process.exit()
            }
            console.log(chalk.green(`\n ${tmlName}模块下载成功! \n`))
            return process.exit()
          })
        })
      })
    }
  })
}
