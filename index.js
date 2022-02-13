const path =require('path')
const fs = require('fs')
// console.log(process.argv)
console.log(path.join(__dirname, './dit'))
console.log(path.join(__dirname, 'dit'))
console.log(path.resolve(__dirname, './dit'))
console.log(path.resolve(__dirname, 'dit'))

fs.stat(path.join(__dirname, 'node_modules/.bin'), (err) => {
  console.log(err)
  process.exit()
})
