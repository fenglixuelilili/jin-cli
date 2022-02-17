const path = require("path")
const fs = require("fs")
fs.stat(path.join(__dirname, "node_modules/.bin"), (err) => {
  console.log(err)
  process.exit()
})
