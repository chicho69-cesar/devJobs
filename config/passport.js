const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')

const User = require('../models/user')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const user = await User.findOne({ email })
  if (!user) {
    return done(null, false, { 
      message: 'This user does not exist.' 
    })
  }

  if (!user.comparePassword(password)) {
    return done(null, false, { 
      message: 'Incorrect email or password.' 
    })
  }

  return done(null, user)
}))

passport.serializeUser((user, done) => {
  return done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).exec()
  return done(null, user)
})

module.exports = passport
