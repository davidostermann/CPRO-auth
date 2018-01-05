const express = require('express')
const model = require('../models/card')

const ctrl = {}

ctrl.getAll = (req, res) => {
  model
    .getCards()
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.post = (req, res) => {
  const { name } = req.body
  model
    .createCard({ name })
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.put = (req, res) => {
  const { id } = req.params
  const { name } = req.body
  model
    .updateCard({ id, name })
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.delete = (req, res) => {
  const { id } = req.params
  model
    .deleteCard(id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

module.exports = ctrl