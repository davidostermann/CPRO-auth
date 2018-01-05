const db = require('./db')

module.exports = {
  getCards() {
    return db.unwrapQuery('SELECT * FROM cards ORDER BY id')
  },
  getByUser(userId) {
    return db.unwrapQuery(`
    SELECT cards.*, lists.id as list_id FROM users_cards_lists as ucl
    JOIN cards ON cards.id=ucl.card_id
    JOIN lists ON lists.id=ucl.list_id
    WHERE ucl.user_id=${userId}
    `)
  },
  createCard({ name, masterId }) {
    return db.unwrapQuery(`INSERT INTO cards(name) VALUES ('${name}')`)
  },
  updateCard({ id, name, masterId }) {
    return db.unwrapQuery(`UPDATE cards SET name='${name}' WHERE id=${id}`)
  },
  deleteCard(id) {
    return db.unwrapQuery(`DELETE FROM cards WHERE id=${id}`)
  }
}