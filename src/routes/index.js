const homeRouter = require('./home')
const languageRouter = require('./language')
const compileRouter = require('./compile')
const aboutRouter = require('./about')
const authRouter = require('./auth')
const accountRouter = require('./profile')

module.exports = {
  compileRouter,
  languageRouter,
  homeRouter,
  aboutRouter,
  authRouter,
  accountRouter
}
