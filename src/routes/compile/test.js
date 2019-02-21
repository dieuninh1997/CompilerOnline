var request = require('request')// https://www.jdoodle.com/compiler-api/docs
var program = {
  script: '# your code goes here\nx,y, z=input().split()\nprint(x+y+z)',
  stdin: '1 2 ninh',
  language: 'python3',
  versionIndex: '0',
  clientId: '24c3feb96f3a0f6b5e90f7617974f8c9',
  clientSecret: 'ff58e78a49236cf16dc8606a9fad5834fa9e31b4cba431dfb9bd27e5ac91f599'
}

// {
//   "script" : "console.log('hello')",
//   "language": "nodejs",
//   "versionIndex": "1",
//   "clientId": MY_CLIENT_ID,
//   "clientSecret": MY_CLIENT_SECRET
// }
const config = {
  url: 'https://api.jdoodle.com/execute',
  method: 'POST',
  json: program
}
request(config, function (error, response, body) {
  console.log('error:', error)
  console.log('statusCode:', response && response.statusCode)
  console.log('body:', body)
})
