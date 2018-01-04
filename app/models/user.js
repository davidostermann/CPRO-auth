const db = require('./db')
const { encodePassword } = require('../auth/pwd') 
const defaultListId = 1;

module.exports = {
  getUsers() {
    return db.unwrapQuery('SELECT * FROM users ORDER BY id');
  },
  getById(id) {
    return db
      .unwrapQuery(`SELECT * FROM users WHERE id=${id}`)
      .then( users => {
        return users.length 
          ? users[0] 
          : Promise.reject('No user for its ID')
      })

  },
  getByEmail(email) {
    console.log('email : ', email);
    
    return db
      .unwrapQuery(`SELECT * FROM users WHERE email='${email}'`)
      .then(users => {
        return users.length
          ? users[0]
          : Promise.reject('No user for its email');
      })
  },
  createUser({ lastname, firstname, email, pwd }) {
    return encodePassword(pwd)
    .then(hash =>
      db.unwrapQuery(`
        INSERT INTO users(firstname, lastname, email, pwd, roletype)
        VALUES ('${firstname}', '${lastname}', 
        '${email}', '${hash}', 'user')`)
    );
  },
  updateUser({ id, firstname, lastname }) {
    return db.unwrapQuery(`
    UPDATE users 
    SET firstname='${firstname}', lastname='${lastname}
    WHERE id=${id}`);
  },
  deleteUser(id) {
    return db.unwrapQuery(`DELETE FROM users WHERE id=${id}`);
  },
  addCard({ userId, cardId }) {
    return db.unwrapQuery(`
    INSERT INTO users_cards_lists SET 
    user_id=${userId}, 
    card_id=${cardId}, 
    list_id=${defaultListId}`);
  },
  setListCard({ userId, cardId, listId }) {
    return db.unwrapQuery(`
    UPDATE users_cards_lists 
    SET list_id=${listId}
    WHERE user_id=${userId} 
    AND card_id=${cardId}`);
  }
};