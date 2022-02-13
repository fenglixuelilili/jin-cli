// 将所有模版罗列
const config = require('../templates.json')
module.exports = () => {
  console.log(config['tpl'])
  process.exit()
}
