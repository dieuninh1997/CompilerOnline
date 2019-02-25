// Update with your config settings.
const config = require('./src/config/config')

module.exports = {
  development: config.dev,
  staging: config.dev,
  production: config.product
}
