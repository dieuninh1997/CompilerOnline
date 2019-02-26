const homeRouter = require('./home')
const languageRouter = require('./language')
const compileRouter = require('./compile')
const aboutRouter = require('./about')
const authRouter = require('./auth')

module.exports = {
  compileRouter,
  languageRouter,
  homeRouter,
  aboutRouter,
  authRouter
}
