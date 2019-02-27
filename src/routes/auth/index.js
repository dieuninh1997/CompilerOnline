const express = require('express')
const authRouter = express.Router()
const passport = require('../../config/passport')
const knex = require('../../knex')

// face
authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))

authRouter.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/login' }), (req, res, next) => {
    res.redirect('/profile')
  })

// google
authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile'] }))

authRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  function (req, res, next) {
    res.redirect('/profile')
  })

authRouter.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

authRouter.post('/login', passport.authenticate('local', { failureRedirect: '/auth/register' }), (req, res, next) => {
  res.redirect('/profile')
})

authRouter.get('/login', (req, res, next) => {
  try {
    res.render('auth/login.html', {
      webTitle: 'Login'
    })
  } catch (error) {
  }
})

authRouter.get('/register', (req, res, next) => {
  try {
    res.render('auth/register.html', {
      webTitle: 'Register'
    })
  } catch (error) {

  }
})

authRouter.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const itemInsert = {
      name,
      email,
      password
    }
    const user = await knex.select().from('users').where('email', email)
    if (user && user.length) {
      throw new Error('Email existed')
    }
    await knex('users').insert(itemInsert)
    res.json({
      success: true,
      message: 'register success',
      data: itemInsert
    })
  } catch (error) {
    res.json({
      success: false,
      message: 'register failed',
      data: error
    })
  }
})

module.exports = authRouter
