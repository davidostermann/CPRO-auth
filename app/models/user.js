const db = require('./db')
const { encode } = require('../auth/pwd')

module.exports = {
  getUsers() {
    return db.unwrapQuery('SELECT * FROM users ORDER BY id')
  },
  createUser({ lastname, firstname, email, pwd }) {
    return encode(pwd).then(hash => db.query(`
        INSERT INTO users(firstname, lastname, email, password, role)
        VALUES ('${firstname}', '${lastname}', 
        '${email}', '${hash}', 'user')`))
  },
  updateUser({ userId, firstname, lastname }) {

    return db.unwrapQuery(`
    UPDATE users 
    SET firstname='${firstname}', lastname='${lastname}'
    WHERE id=${userId}`)
  },
  deleteUser(userId) {
    return db.unwrapQuery(`DELETE FROM users WHERE id=${userId}`)
  },
  getById(userId) {
    return db
      .unwrapQuery(`SELECT * FROM users WHERE id=${userId}`)
      .then(data => data[0] || false)
      .catch(err => Promise.reject(err));
  },
  getByEmail(email) {
    return db
      .unwrapQuery(`SELECT * FROM users WHERE email='${email}'`)
      .then(data => data[0] || false)
      .catch(err => Promise.reject(err))
  },
  notExists(email) {
    return db
      .unwrapQuery(`SELECT * FROM users WHERE email='${email}'`)
      .then(
        users =>
          !users.length || Promise.reject({ error: 'User already exist' })
      )
  },
  setRole({ userId, role }) {
    return db.unwrapQuery(`
    UPDATE users 
    SET role='${role}' 
    WHERE id=${userId}`)
  }
}
