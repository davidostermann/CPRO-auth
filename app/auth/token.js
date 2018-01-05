const jwt = require('jsonwebtoken')

/**
 * expose la fonction de génération du token
 * @param {Object} userInfo
 */
exports.generateToken = userInfo => {
  return jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: 10080 })
}
