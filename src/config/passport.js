const knex = require('./../knex')
const passport = require('passport')
const LocalStrategy = require('passport-local')

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, (email, password, done) => {

}))
