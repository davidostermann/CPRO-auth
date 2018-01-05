const express = require('express')
const model = require('../models/user')
const card = require('../models/card')

const { authJwt } = require('../auth/passport')
const {
  roleAuthorization,
  ownAccount,
  isCardAssociated
} = require('../auth/authorization.js')

const ctrl = {}

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
