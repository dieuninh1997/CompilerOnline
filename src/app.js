var express = require('express')

var es6Renderer = require('express-es6-template-engine')

var app = express()
var path = require('path')
var index = require('./routes/index')

app.engine('html', es6Renderer)
app.use(express.static(path.resolve(__dirname, './views')))
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)

// ham nay de handle nhung thuoc tinh bat buoc co trong trong request, vi du nhu token trong header, cookie,.v.v.v.
app.use(function (req, res, next) {
  next()
})

// error handler
app.use(function (error, req, res, next) {
  console.log('========================================')
  console.log('err', error)
  console.log('========================================')
  // set locals, only providing error in development
  res.locals.message = error.message
  res.locals.error = req.app.get('env') === 'development' ? error : {}

  // render the error page
  res.status(error.status || 500)
  res.render('error')
})

module.exports = app
