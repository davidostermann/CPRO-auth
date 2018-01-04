const db = require('./db')
const defaultListId = 1;

module.exports = {

  getUsers() {
    return db.unwrapQuery('SELECT * FROM users ORDER BY id')
  },
  createUser({ firstname, lastname }) {
    return db.unwrapQuery(`
    INSERT INTO users(firstname, lastname)
    VALUES ('${firstname}', '${lastname}')`)
  },
  updateUser({ id, firstname, lastname }) {
    return db.unwrapQuery(`
    UPDATE users 
    SET firstname='${firstname}', lastname='${lastname}'
    WHERE id=${id}`)
  },
  deleteUser(id) {
    return db.unwrapQuery(`DELETE FROM users WHERE id=${id}`)
  },
  addCard({userId, cardId}) {
    return db.unwrapQuery(`
    INSERT INTO users_cards_lists SET 
    user_id=${userId}, 
    card_id=${cardId}, 
    list_id=${defaultListId}`)
  },
  setListCard({ userId, cardId, listId }) {
    return db.unwrapQuery(`
    UPDATE users_cards_lists 
    SET list_id=${listId}
    WHERE user_id=${userId} 
    AND card_id=${cardId}`)
  }

}