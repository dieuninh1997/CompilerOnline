const knex = require('./../knex')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const user = await knex('users').select().where('email', email).first()
  if (!user) {
    return done(null, false, { message: 'Email not found' })
  }
  if (!validatePassword(user, password)) {
    return done(null, false, { message: 'Incorrect password' })
  }
  return done(null, user)
})

const serializeUser = (user, done) => {
  return done(null, user.email)
}

const deserializeUser = async (email, done) => {
  const userInfo = await knex('users').select().where('email', email).first()
  return done(null, userInfo)
}

passport.use(localStrategy)
passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)

const validatePassword = (userFromDb, password) => {
  return userFromDb.password === password
}

module.exports = passport
