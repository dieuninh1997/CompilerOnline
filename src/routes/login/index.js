const express = require('express')
const loginRouter = express.Router()
const passport = require('passport')

// login page
loginRouter.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // res.redirect('/users/' + req.user.username)
    console.log('========================================')
    console.log('res', res)
    console.log('========================================')
  })

module.exports = loginRouter
