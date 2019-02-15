const express = require('express')

const app = express()
const path = require('path')
const { router, homeRouter, languageRouter } = require('./routes')

initViewEngine()

app.use('/', homeRouter)
app.use('/lang', languageRouter)

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
  res.render('error.html')
})

module.exports = app

function initViewEngine () {
  const nunjucks = require('nunjucks')
  nunjucks.configure(path.resolve(__dirname, './views'), {
    autoescape: true,
    express: app
  })
  app.set('view engine', 'html')
  app.use(express.static(path.join(__dirname, 'public')))
}
