const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const { compare } = require('./pwd')

const localOptions = {
  usernameField: 'email',
  passwordField: 'password'
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

/**
 * Récupere le pwd du user en BDD pour le comparer au pwd envoyé.
 * Si la comparaison est positive, renvoie le user dans le callback `done`
 * @param {*} email - correspond à req.params.email (cf. localOptions)
 * @param {*} password - correspond à req.params.password (cf. localOptions)
 * @param {*} done - callback de passport
 */
const checkCredentials = (email, password, done) =>
  User.getByEmail(email)
    .then(user =>
      compare(password, user.password).then(isMatch => done(null, user))
    )
    .catch(err => done(null, false, err))

/**
 * Vérifie que l'id du token correspond bien à un utilsateur en BDD
 * si le user existe, renvoie le user dans le callback `done`
 * @param {*} payload - contenu du token extrait du header (jwtFromRequest cf. jwtOptions) et decodé grâce à la secretKey (cf. jwtOptions)
 * @param {*} done - callback de passport
 */
const checkToken = (payload, done) => {
  return User.getById(payload.id)
    .then(user => done(null, user))
    .catch(err => done(err))
}

// associe les strategies à passport
passport.use(new JwtStrategy(jwtOptions, checkToken))
passport.use(new LocalStrategy(localOptions, checkCredentials))

// expose le middleware pour securiser les routes
exports.authJwt = passport.authenticate('jwt', { session: false })

// expose le middleware pour valider le login
exports.authCredentials = passport.authenticate('local', { session: false })
