const config = require('./config/config')
const configDb = config.isDev ? config.dev : config.product

var knex = require('knex')(configDb)
module.exports = knex
