const express = require('express')
const user = require('../models/user')
const card = require('../models/card')

const ctrl = {}

/**
 * Move a card
 */
ctrl.move = (req, res) => {
  const { userId } = req.params
  const { cardId, listId } = req.body

  console.log('userId : ', userId)
  console.log('cardId : ', cardId)
  console.log('listId : ', listId)
  user
    .setListCard({ userId, cardId, listId })
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

  user
    .addCard({ userId, cardId })
    .then( res => {
      console.log('res : ', res);
      
      return res
    })
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
