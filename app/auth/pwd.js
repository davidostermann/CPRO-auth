const bcrypt = require('bcrypt-nodejs')
const SALT_FACTOR = 5;

/**
 * encode le password envoyé
 * retourne le hash du password
 * @param {string} pwd 
 * @returns {string} le password hash
 */
exports.encode = pwd => new Promise( (resolve, reject) => {

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return reject(err);
    }

    bcrypt.hash( pwd, salt, null, (error, hash) => {
      return error ? reject(error) : resolve(hash)
    })
  })
})

/**
 * compare le password envoyé et le hash stocké
 * @param {string} pwd - password en clair
 * @param {string} hash - password hash
 * @returns {boolean}
 */
exports.compare = (pwd, hash) => new Promise( (resolve, reject) => {

  bcrypt.compare(pwd, hash, function(error, isMatch) {
    return error ? reject({ error }) : resolve(isMatch);
  })
})