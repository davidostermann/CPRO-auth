const bcrypt = require('bcrypt-nodejs')
const SALT_FACTOR = 5;

exports.encodePassword = pwd => new Promise( (resolve, reject) => {

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return reject(err);
    }

    bcrypt.hash( pwd, salt, null, (error, hash) => {
      return error ? reject(error) : resolve(hash)
    })
  })
})

exports.comparePassword = (pwd, hash) => new Promise( (resolve, reject) => {
  bcrypt.compare(pwd, hash, function(error, isMatch) {
    return error ? reject({ error }) : resolve(isMatch);
  })
})