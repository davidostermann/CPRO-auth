require("dotenv").config();
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()

app.use(logger('dev'))

app.use(cors())
app.use(express.json())

const { encodePassword, comparePassword } = require('./auth');
const baconHash = encodePassword('bacon')
.then( hash => { console.log('hash : ', hash); return hash; })
.then( hash => comparePassword('bacon', hash))
.then( isMatch => console.log(`isMatch : ${isMatch}`))
.catch( err => console.log('err : ', err))

// middleware to escape simple quotes
// I use simple quotes in SQL queries (cf. model)
app.use((req, res, next) => {
  req.body = Object.entries(req.body).reduce(( acc, [key, value] ) => {
    acc[key] = (typeof value === 'string') ? value.replace(/\'/g, '\'\'') : value
    return acc
  }, {})
  next();
})

app.use('/lists', require('./controllers/list'))
app.use('/cards', require('./controllers/card'))
app.use('/users', require('./controllers/user'))

app.all('/*', (req, res, ) => {
  res.status(404).send('je suis la 404')
})


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Connected server on port ${port} ( http://localhost:${port} )`)
})
.on('error', err => console.log('erreur de connexion : ', err))