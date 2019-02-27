const app = require('./src')
// const port = process.env.PORT || 3000
// app.listen(port, () => {
//   console.log(`App is running on port ${port} - ${process.env.PORT}`)
// })
const path = require('path')
const fs = require('fs')
var https = require('https')

const certOptions = {
  key: fs.readFileSync(path.resolve(__dirname, './server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, './server.crt'))
}

https.createServer(certOptions, app).listen(443)
