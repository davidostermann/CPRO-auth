const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, (
  email,
  password,
  done
) => {
  User.getUserByEmail(email)
  .then( user => {
    if (!user) {
      return done(null, false, { error: 'Login failed. Please try again.' })
    }

    comparePassword(password, user.pwd)
    .then( isMatch => {
      if (!isMatch) {
        return done(null, false, {
          error: 'Login failed. Please try again.'
        })
      }

      return done(null, user)
    })
    .catch( err => done(err))

  })
  .catch( err => done(err))
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.getById(payload._id)
  .then( user => {
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
  .catch( err => done(err))
})

passport.use(jwtLogin)
passport.use(localLogin)

console.log('init passport');

exports.requireAuth = passport.authenticate("jwt", { session: false }),
exports.requireLogin = passport.authenticate("local", { session: false });
