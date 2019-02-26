const express = require('express')
const authRouter = express.Router()
const passport = require('../../config/passport')
const knex = require('../../knex')

// login page
authRouter.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' }),
  function (req, res, next) {
    res.redirect('/')
  }
)

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
