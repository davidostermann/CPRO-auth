const db = require('./db')
const defaultListId = 1

module.exports = {
  create({ userId, cardId }) {
    return db
      .unwrapQuery(
        `INSERT INTO users_cards_lists(user_id, card_id, list_id) 
        VALUES (${userId}, ${cardId}, ${defaultListId})`)
      .catch(err =>
        Promise.reject({
          error:
            err.code === '23505'
              ? 'User is already associated to this card'
              : 'Database error'
        })
      )
  },
  setList({ userId, cardId, listId }) {
    return db.unwrapQuery(`
    UPDATE users_cards_lists 
    SET list_id=${listId}
    WHERE user_id=${userId} 
    AND card_id=${cardId}`)
  },
  exist({ userId, cardId }) {
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
