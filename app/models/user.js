const db = require('./db')
const { encodePassword } = require('../auth/pwd')
const defaultListId = 1

module.exports = {
  getUsers() {
    return db.unwrapQuery('SELECT * FROM users ORDER BY id')
  },
  getById(id) {
    return db.unwrapQuery(`SELECT * FROM users WHERE id=${id}`).then(users => {
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
  createUser({ lastname, firstname, email, pwd }) {
    return encodePassword(pwd).then(hash =>
      db.unwrapQuery(`
        INSERT INTO users(firstname, lastname, email, pwd, roletype)
        VALUES ('${firstname}', '${lastname}', 
        '${email}', '${hash}', 'user')`)
    )
  },
  updateUser({ id, firstname, lastname }) {
    return db.unwrapQuery(`
    UPDATE users 
    SET firstname='${firstname}', lastname='${lastname}
    WHERE id=${id}`)
  },
  deleteUser(id) {
    return db.unwrapQuery(`DELETE FROM users WHERE id=${id}`)
  },
  setRole({ userId, role }) {
    return db.unwrapQuery(`
    UPDATE users 
    SET roletype='${role}' 
    WHERE id=${userId}`)
  },

  addCard({ userId, cardId }) {
    return db.unwrapQuery(`
    INSERT INTO users_cards_lists(user_id, card_id, list_id) 
    VALUES (${userId}, ${cardId}, ${defaultListId})`)
  },
  setListCard({ userId, cardId, listId }) {
    return db.unwrapQuery(`
    UPDATE users_cards_lists 
    SET list_id=${listId}
    WHERE user_id=${userId} 
    AND card_id=${cardId}`)
  },
  isCardOwner({ userId, cardId }) {
    return db
      .unwrapQuery(
        `
        SELECT COUNT(*) FROM users_cards_lists as ucl
        WHERE ucl.user_id = ${userId}
        AND ucl.card_id = ${cardId}`
      )
      .then(
        result =>
          +result[0].count ||
          Promise.reject({
            error: "User doesn't own card"
          })
      )
  }
}
