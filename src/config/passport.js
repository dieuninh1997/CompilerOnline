const knex = require('./../knex')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await knex('users').select().where('email', email).first()
    if (!user) {
      return done(null, false, { message: 'Email not found' })
    }
    if (!validatePassword(user, password)) {
      return done(null, false, { message: 'Incorrect password' })
    }
    return done(null, user.id)
  } catch (error) {
    return done(null, false, { message: error })
  }
})

const facebookStrategy = new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.WEB_URL + '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await knex('users').select().where('user_auth_id', profile._json.id).first()
    if (!user) {
      const { displayName, _json } = profile
      const itemInsert = {
        name: displayName,
        user_auth_id: _json.id
      }
      const id = await knex('users').insert(itemInsert)
      return done(null, id)
    }
    return done(null, user.id)
  } catch (error) {
    return done(null, false, { message: error })
  }
})

const googleStrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.WEB_URL + '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await knex('users').select().where('user_auth_id', profile._json.id).first()
    if (!user) {
      const { displayName, _json } = profile
      const itemInsert = {
        name: displayName,
        user_auth_id: _json.id
      }
      const id = await knex('users').insert(itemInsert)
      return done(null, id)
    }
    return done(null, user.id)
  } catch (error) {
    return done(null, false, { message: error })
  }
})

const serializeUser = (userId, done) => {
  return done(null, userId)
}

const deserializeUser = async (userId, done) => {
  const userInfo = await knex('users').select().where('id', userId).first()
  return done(null, userInfo)
}

passport.use(localStrategy)
passport.use(facebookStrategy)
passport.use(googleStrategy)
passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)

const validatePassword = (userFromDb, password) => {
  return userFromDb.password === password
}

module.exports = passport
