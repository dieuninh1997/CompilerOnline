const knex = require('./../knex')
const passport = require('passport')
const LocalStrategy = require('passport-local')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (email, password, done) => {
  console.log('========================================')
  console.log('hihih', { email, password })
  console.log('========================================')
  return done(null, { email, password })
}))

module.exports = passport
