const db = require('./db')

module.exports = {

  getFullLists() {
    return db.unwrapQuery(`
    SELECT lists.id, lists.name, JSON_AGG(
      JSON_BUILD_OBJECT('name',
        r.card_name,
        'users', r.user_name
      )
    ) as cards
    FROM (
      SELECT card_id, cards.name as card_name, list_id, 
      JSON_AGG( users.firstname ) as user_name
      FROM users_cards_lists
      JOIN users ON users.id = user_id
      JOIN cards ON cards.id = card_id
      GROUP BY card_id, card_name, list_id
    ) as r
    JOIN lists ON lists.id = r.list_id
    GROUP BY lists.id`)
  },
  /**
   * none arguments
   * return a list of lists
   */
  getLists() {
    return db.unwrapQuery('SELECT * FROM lists ORDER BY id')
  },
  createList(name) {
    return db.unwrapQuery(`INSERT INTO lists(name) VALUES ('${name}')`)
  },
  updateList({ id, name }) {
    return db.unwrapQuery(`UPDATE lists SET name='${name}' WHERE id=${id}`)
  },
  deleteList(id) {
    return db.unwrapQuery(`DELETE FROM lists WHERE id=${id}`)
  }

}

