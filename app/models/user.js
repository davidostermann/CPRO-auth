const db = require('./db')
const { encodePassword } = require('../auth/pwd')

module.exports = {
  getUsers() {
    return db.unwrapQuery('SELECT * FROM users ORDER BY id')
  },
  createUser({ lastname, firstname, email, pwd }) {
    return encodePassword(pwd).then(hash =>
      db.unwrapQuery(`
        INSERT INTO users(firstname, lastname, email, pwd, role)
        VALUES ('${firstname}', '${lastname}', 
        '${email}', '${hash}', 'user')`)
    )
  },
  updateUser({ userId, firstname, lastname }) {
    console.log('userId : ', userId);
    
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
      .then(users => {
        return users.length ? users[0] : Promise.reject('No user for its ID')
      })
  },
  getByEmail(email) {
    return db
      .unwrapQuery(`SELECT * FROM users WHERE email='${email}'`)
      .then(users => {
        return users.length
          ? users[0]
          : Promise.reject({ error: 'No user for its email' })
      })
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
