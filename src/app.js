const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')

const { homeRouter, languageRouter, compileRouter, aboutRouter, authRouter, accountRouter } = require('./routes')
const passport = require('./config/passport')

const app = express()

initViewEngine()
app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.resolve(__dirname, './public')))
  .use(expressSession({ secret: 'keyboard', resave: true, saveUninitialized: true }))
  .use(passport.initialize())
  .use(passport.session())
  .use(handleLogin)
  .use('/', homeRouter)
  .use('/lang', languageRouter)
  .use('/compile', compileRouter)
  .use('/about', aboutRouter)
  .use('/auth', authRouter)
  .use('/account', accountRouter)
  .use(handleError)

module.exports = app

function handleLogin (req, res, next) {
  res.locals.isLogin = req.isAuthenticated()
  next()
}

function initViewEngine () {
  const nunjucks = require('nunjucks')
  nunjucks.configure(path.resolve(__dirname, './views'), {
    autoescape: true,
    express: app
  })
  app.set('view engine', 'html')
}

function handleError (error, req, res, next) {
  res.locals.message = error.message
  res.locals.error = req.app.get('env') === 'development' ? error : {}

  res.status(error.status || 500)
  res.render('error/error.html')
}
