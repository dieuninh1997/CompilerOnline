const express = require('express')
const aboutRouter = express.Router()
// about page
aboutRouter.get('/', function (req, res, next) {
  res.render('about/about.html', {
    webTitle: 'About'
  })
})

module.exports = aboutRouter
