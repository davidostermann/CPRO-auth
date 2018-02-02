const express = require('express')
const model = require('../models/user')
const card = require('../models/card')

const ctrl = {}

ctrl.getAll = (req, res) => {
  model
    .getUsers()
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.getByEmail = (req, res) => {
  model
    .getByEmail(req.params.email)
    .then(u => res.json(u))
    .catch(err => res.json(err))
}

ctrl.getById = (req, res) => {
  model
    .getById(req.params.userId)
    .then(u => res.json(u))
    .catch(err => res.json(err))
}

ctrl.update = (req, res) => {
  const { userId } = req.params
  const { firstname, lastname } = req.body
  model
    .updateUser({ userId, firstname, lastname })
    .then(result => model.getById(userId))
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.delete = (req, res) => {
  const { userId } = req.params
  model
    .deleteUser(userId)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

ctrl.setRole = (req, res) => {
  const { userId, role } = req.params
  model
    .setRole({ userId, role })
    .then(result => model.getById(userId))
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

module.exports = ctrl
