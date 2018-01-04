const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const { comparePassword } = require('./pwd')

const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, (
  email,
  password,
  done
) => User.getByEmail(email)
      .then(
        user => comparePassword(password, user.pwd)
          .then(
            isMatch => isMatch ? done(null, user) : Promise.reject('Bad password'))
      )
      .catch(err => done(null, false, err))
)

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
