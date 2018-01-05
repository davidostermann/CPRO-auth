const express = require('express')
const user = require('../models/user')
const userCard = require('../models/user.card')
const card = require('../models/card')

const ctrl = {}

/**
 * Move a card
 */
ctrl.move = (req, res) => {
  const { userId } = req.params
  const { cardId, listId } = req.body

  userCard
    .setList({ userId, cardId, listId })
    .then(result => card.getByUser(userId))
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

/**
 * Add a card to a user
 */
ctrl.add = (req, res) => {
  const { userId } = req.params
  const { cardId } = req.body

  userCard
    .create({ userId, cardId })
    // .then(errr => {
    //   console.log('errr : ', errr)

    //   return errr
    // })
    .then(result => card.getByUser(userId))
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

/**
 * Get user cards
 */
ctrl.get = (req, res) => {
  card
    .getByUser(req.params.userId)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

module.exports = ctrl
