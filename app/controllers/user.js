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

ctrl.getById = (req, res) => {
  model
    .getById(req.params.userId)
    .then(u => res.json(u))
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

module.exports = ctrl
