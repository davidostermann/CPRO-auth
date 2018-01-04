const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const { comparePassword } = require('./pwd')

const localOptions = {
  usernameField: 'email'
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const checkCredentials = (email, password, done) =>
  User.getByEmail(email)
    .then(user => 
      comparePassword(password, user.pwd)
        .then( isMatch => done(null, user)))
    .catch(err => done(null, false, err));

const checkToken = (payload, done) =>
  User.getById(payload._id)
    .then(user => done(null, user || false))
    .catch(err => done(err))

passport.use(new JwtStrategy(jwtOptions, checkToken))
passport.use(new LocalStrategy(localOptions, checkCredentials))

exports.requireAuth = passport.authenticate("jwt", { session: false }),
exports.requireLogin = passport.authenticate("local", { session: false });
