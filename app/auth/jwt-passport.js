const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const user = require("../models/user");

/**
 * expose la fonction de génération du token
 * @param {Object} userInfo
 */
exports.generateToken = userInfo => {
  return jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: 10080 });
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

/**
 * Vérifie que l'id du token correspond bien à un utilsateur en BDD
 * si le user existe, renvoie le user dans le callback `done`
 * @param {*} payload - contenu du token extrait du header (jwtFromRequest cf. jwtOptions) et decodé grâce à la secretKey (cf. jwtOptions)
 * @param {*} done - callback de passport
 */
const checkToken = (payload, done) => {
  return user.getById(payload.id)
    .then(user => done(null, user))
    .catch(err => done(err))
}

// config
passport.use(new Strategy(jwtOptions, checkToken))

// middleware
exports.authJwt = passport.authenticate("jwt", { session: false });