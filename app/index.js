require("dotenv").config();
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()
const { listRouter, cardRouter, userRouter } = require('./routes')

app.use(logger('dev'))
app.use(cors())
app.use(express.json())

// middleware to escape simple quotes
// I use simple quotes in SQL queries (cf. model)
app.use((req, res, next) => {
  req.body = Object.entries(req.body).reduce(( acc, [key, value] ) => {
    acc[key] = (typeof value === 'string') ? value.replace(/\'/g, '\'\'') : value
    return acc
  }, {})
  next();
})

app.use('/lists', listRouter)
app.use('/cards', cardRouter)
app.use('/users', userRouter)

app.all('/*', (req, res, ) => {
  res.status(404).send('je suis la 404')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Connected server on port ${port} ( http://localhost:${port} )`)
})
.on('error', err => console.log('erreur de connexion : ', err))