const homeRouter = require('./home')
const languageRouter = require('./language')
const compileRouter = require('./compile')
const aboutRouter = require('./about')
const authRouter = require('./auth')
const accountRouter = require('./profile')
const codesRouter = require('./codes')

module.exports = {
  compileRouter,
  languageRouter,
  homeRouter,
  aboutRouter,
  authRouter,
  accountRouter,
  codesRouter
}
