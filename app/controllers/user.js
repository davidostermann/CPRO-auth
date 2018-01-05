const express = require('express')
const model = require('../models/user')
const card = require('../models/card')

const { authCredentials, authJwt } = require('../auth/passport')
const { generateToken } = require('../auth/token')
const {
  roleAuthorization,
  ownAccount,
  isCardAssociated
} = require('../auth/authorization.js')

const ctrl = {}

ctrl.getAll = (req, res) => {}

ctrl.getAll = (req, res) => {
  model
    .getUsers()
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.getById = (req, res) => {
  model
    .getById(req.params.userId)
    .then(u => res.json(u))
    .catch(err => res.json(err))
}

ctrl.register = (req, res) => {
  const { lastname, firstname, email, pwd } = req.body
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address' })
  }

  if (!pwd) {
    return res.status(422).send({ error: 'You must enter a password' })
  }

  return model
    .notExists(email)
    .then(exist => model.createUser({ lastname, firstname, email, pwd }))
    .then(result => model.getByEmail(email))
    .then(result => res.send(result))
    .catch(error => res.status(422).send({ error }))
}

ctrl.login = (req, res) => {
  // Grâce au middleware authCredentials, on récupere le user
  const userInfo = {
    id: req.user.id,
    email: req.user.email,
    role: req.user.roletype
  }

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  })
}

/**
 * Move a card
 */
ctrl.moveCard = (req, res) => {
  const { userId, cardId } = req.params
  const { listId } = req.body
  model
    .setListCard({ userId, cardId, listId })
    .then(result => card.getByUser(userId))
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

/**
 * Add a card to a user
 */
ctrl.addCard = (req, res) => {
  const { userId } = req.params
  const { cardId } = req.body
  model
    .addCard({ userId, cardId })
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.update = (req, res) => {
  const { id } = req.params
  const { firstname, lastname } = req.body
  model
    .updateUser({ id, firstname, lastname })
    .then(result => model.getById(id))
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.delete = (req, res) => {
  const { id } = req.params
  model
    .deleteUser(id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.setRole = (req, res) => {
  console.log('id : ', req.params.id)
  console.log('role : ', req.params.role)

  const { id, role } = req.params
  model
    .setRole({ userId: id, role })
    .then(result => model.getById(id))
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.getCards = (req, res) => {
  card
    .getByUser(req.params.userId)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

module.exports = ctrl
