// 将所有模版罗列
const all = require('../config')
module.exports = () => {
  let map = {
    'complete': '所有项目：',
    'modular': '所有模块：'
  }
  for( let templ in all ){
    console.log(`\n${map[templ]} \n`)
    for( let key in  all[templ]){
      console.log(`${all[templ][key].name} 执行命令： jin-cli install ${key} \n`)
    }
  }
  process.exit()
}
