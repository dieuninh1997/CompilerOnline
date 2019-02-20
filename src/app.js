const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const path = require('path')
const { homeRouter, languageRouter, compileRouter } = require('./routes')

initViewEngine()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, './public')))
app.use('/', homeRouter)
app.use('/lang', languageRouter)
app.use('/compile', compileRouter)

// ham nay de handle nhung thuoc tinh bat buoc co trong trong request, vi du nhu token trong header, cookie,.v.v.v.
app.use(function (req, res, next) {
  next()
})

// error handler
app.use(function (error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message
  res.locals.error = req.app.get('env') === 'development' ? error : {}

  // render the error page
  res.status(error.status || 500)
  res.render('error/error.html')
})

module.exports = app

function initViewEngine () {
  const nunjucks = require('nunjucks')
  nunjucks.configure(path.resolve(__dirname, './views'), {
    autoescape: true,
    express: app
  })
  app.set('view engine', 'html')
}
