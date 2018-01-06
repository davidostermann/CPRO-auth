
const db = require('../models/db')
const fs = require('fs')
const jwt = require('jsonwebtoken')

exports.adminToken = token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
  expiresIn: 10080
})

exports.userToken = token = jwt.sign({ id: 2 }, process.env.JWT_SECRET, {
  expiresIn: 10080
})

exports.setupDB = () => {
  const sql = fs.readFileSync('../setup.sql').toString()
  return db.query(sql)
}
