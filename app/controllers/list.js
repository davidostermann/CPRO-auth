const express = require('express')
const model = require('../models/list')

const ctrl = {}

ctrl.getFull = (req, res) => {
  model
    .getFullLists()
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.getAll = (req, res) => {
  model
    .getLists()
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.post = (req, res) => {
  const { name } = req.body
  model
    .createList(name)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.put = (req, res) => {
  const { id } = req.params
  const { name } = req.body
  model
    .updateList({ id, name })
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.delete = (req, res) => {
  const { id } = req.params
  model
    .deleteList(id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

module.exports = ctrl