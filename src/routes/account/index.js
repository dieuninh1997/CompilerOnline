const express = require('express')
const accountRouter = express.Router()

const loggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

accountRouter.get('/', loggedIn, (req, res, next) => {
  res.render('account/account.html', {
    webTitle: 'Account',
    user: req.user
  })
})

module.exports = accountRouter
