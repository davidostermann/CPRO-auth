const express = require('express')
const jwt = require('jsonwebtoken');
const model = require('../models/user')

const { requireLogin, requireAuth } = require('../auth/passport')

const generateToken = user => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 10080 });
}

const setUserInfo = request => ({
  _id: request.id,
  email: request.email,
  role: request.roletype
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
    const { lastname, firstname, email, pwd } = req.body;
    if (!email) {
      return res.status(422).send({ error: 'You must enter an email address' })
    }

    if (!pwd) {
      return res.status(422).send({ error: 'You must enter a password' })
    }

    return model
      .notExists(email)
      .then( exist => createUser({ lastname, firstname, email, pwd }))
      .then(result => res.send(result))
      .catch(error => res.status(422).send({ error }))
  })
  .post('/login', requireLogin, (req, res) => {
      
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