const express = require('express')
const languageRouter = express.Router()
const { listLanguague } = require('../../models/languages/languages')
const fs = require('fs')
const path = require('path')

languageRouter.get('/:langCode/:language', function (req, res, next) {
  try {
    const { language, langCode } = req.params
    fs.readFile(path.resolve(__dirname, `../../models/languages/examples/${langCode.toLowerCase()}.txt`), 'utf8', function readFilee (err, data) {
      if (err) {
        return
      }
      res.render('home/home.html', {
        language,
        langCode,
        listLanguague,
        data
      })
    })
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = languageRouter
