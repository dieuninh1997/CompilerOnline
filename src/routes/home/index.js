const express = require('express')
const homeRouter = express.Router()
const { listLanguague } = require('../../models/languages/languages')
// home page
homeRouter.get('/', function (req, res, next) {
  res.render('index.html', {
    language: '1',
    langCode: 'C',
    listLanguague
  })
})

module.exports = homeRouter
