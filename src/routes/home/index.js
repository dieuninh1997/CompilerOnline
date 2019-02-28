const express = require('express')
const homeRouter = express.Router()
const { listLanguague } = require('../../models/languages/languages')
// home page
homeRouter.get('/', function (req, res, next) {
  res.render('home/home.html', {
    language: '0',
    langCode: '',
    listLanguague,
    webTitle: 'Ez Compiler'
  })
})

module.exports = homeRouter
