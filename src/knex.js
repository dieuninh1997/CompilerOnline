const config = require('./config/config')
const configDb = config.isDev ? config.dev : config.product
console.log('========================================')
console.log('configDb', configDb)
console.log('========================================')
var knex = require('knex')(configDb)
module.exports = knex
