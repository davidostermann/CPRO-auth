const express = require('express')
const model = require('../models/user')

const { requireLogin, requireAuth } = require('../auth/passport')

const generateToken = user => {
  return jwt.sign(user, authConfig.secret, { expiresIn: 10080 });
}

const setUserInfo = request => ({
  _id: request._id,
  email: request.email,
  role: request.role
});

module.exports = express.Router()
  .get('/', (req, res) => {
    model.getUsers()
      .then(result => res.json(result))
      .catch(err => res.json(err))
  })
  .get('/:id', (req, res) => {
    model
      .getById(req.params.id)
      .then(u => res.json(u))
      .catch(err => res.json(err));
  })
  .post('/', (req, res) => {
    const { lastname, firstname, email, pwd, role } = req.body;
    model
      .createUser({ lastname, firstname, email, pwd, role })
      .then(result => res.send(result))
      .catch(err => console.log(err));
  })
  .get('/login', requireLogin, (req, res) => {

      const userInfo = setUserInfo(req.user);

      res
        .status(200)
        .json({
          token: "JWT " + generateToken(userInfo),
          user: userInfo
        });
  })
  /**
   * Move a card
   */
  .put('/:userId/card/:cardId/list', (req, res) => {
    const { userId, cardId } = req.params
    const { listId } = req.body
    model.setListCard({ userId, cardId, listId })
      .then(result => res.json(result))
      .catch(err => res.json(err))
  })
  /**
   * Add a card to a user
   */
  .post('/:userId/card', (req, res) => {
    const { userId } = req.params;
    const { cardId } = req.body;
    model.addCard({ userId, cardId })
      .then(result => res.json(result))
      .catch(err => res.json(err))
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const { firstname, lastname } = req.body;
    model.updateUser({ id, firstname, lastname })
      .then(result => res.json(result))
      .catch(err => res.json(err))
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;
    model.deleteUser(id)
      .then(result => res.json(result))
      .catch(err => res.json(err))
  })