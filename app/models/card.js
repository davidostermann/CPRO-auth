const db = require('./db')

module.exports = {

  getCards() {
    return db.unwrapQuery('SELECT * FROM cards ORDER BY id')
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