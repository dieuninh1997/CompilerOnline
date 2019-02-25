const express = require('express')
const loginRouter = express.Router()
const passport = require('passport')

// login page
loginRouter.post('/login',
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login'
  }),
  function (req, res) {
    console.log('========================================')
    console.log('res login', res)
    console.log('========================================')
  })

module.exports = loginRouter
