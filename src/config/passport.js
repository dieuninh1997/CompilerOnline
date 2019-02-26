const knex = require('./../knex')
const passport = require('passport')
const LocalStrategy = require('passport-local')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  const user = await knex('users').select().where('email', email).first()
  if (!user) {
    return done(null, false, { message: 'Email not found' })
  }
  if (!validatePassword(user, password)) {
    return done(null, false, { message: 'Incorrect password' })
  }
  return done(null, user)
}))

const validatePassword = (userFromDb, password) => {
  return userFromDb.password === password
}

module.exports = passport
