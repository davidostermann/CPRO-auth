const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()
const {
  listRouter,
  cardRouter,
  userRouter,
  authRouter,
  userCardRouter
} = require('./routes')

app.use(logger('dev'))
app.use(cors())
app.use(express.json())

// middleware to escape simple quotes
// I use simple quotes in SQL queries (cf. model)
app.use((req, res, next) => {
  req.body = Object.entries(req.body).reduce((acc, [key, value]) => {
    acc[key] = typeof value === 'string' ? value.replace(/\'/g, "''") : value
    return acc
  }, {})
  next()
})

app.use('/lists', listRouter)
app.use('/cards', cardRouter)
app.use('/user/cards', userCardRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.all('/*', (req, res) => {
  res.status(404).send('je suis la 404')
})

module.exports = app
