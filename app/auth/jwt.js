const jwt = require("jsonwebtoken");
const user = require("../models/user");
const tokenErr = "Vous n'avez pas les droits pour accéder à ce service";

//Doc. https://github.com/auth0/node-jsonwebtoken

/**
 * expose la fonction de génération du token
 * NB. expire dans 10800s => 3 heures
 * @param {Object} userInfo
 */
exports.generateToken = user => {
  const {id, email, role} = user
  const userInfo = { id, email, role: role }
  return jwt.sign(userInfo, JWT_SECRET, { expiresIn: 10800 });
}

/**
 * Extrait le token du header
 * Autrement, vous pouvez aussi utiliser : https://github.com/tkellen/js-express-bearer-token
 * regexp from https://github.com/themikenicholson/passport-jwt/blob/master/lib/auth_header.js
 * @param {*} headerValue 
 */
const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== "string") {
    return false;
  }
  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
}
exports.extractBearerToken = extractBearerToken;

/**
 * Middleware pour verifier le token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.checkTokenMiddleware = (req, res, next) => {

  const token = req.headers 
    && req.headers.authorization 
    && extractBearerToken(req.headers.authorization);

  if(!token) {
    return res.status(401).json({error:tokenErr})
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {


    if (err) {
      return res.status(401).json({ error: tokenErr })
    }

    // Vérifie que l'id du token correspond bien à un utilsateur en BDD
    return user
      .getById(decoded.id)
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: tokenErr })
        }

        req.user = user
        return next()
      })
      .catch(err => res.status(401).json({ error: err }))
  })

}