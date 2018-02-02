const express = require('express')

/** Way 1 */
//const { authJwt, authCredentials } = require('./auth/passport')

/** Way 2 */
// const { authCredentials } = require('./auth/login-passport')
// const { authJwt } = require('./auth/jwt-passport')

/** Way 3 */
const { checkCredentialsMiddleware } = require('./auth/login')
const { checkTokenMiddleware } = require('./auth/jwt')
const authCredentials = checkCredentialsMiddleware
const authJwt = checkTokenMiddleware

const {
  roleAuthorization,
  ownAccount,
  isCardAssociated
} = require('./auth/authorization')
const listCtrl = require('./controllers/list')
const cardCtrl = require('./controllers/card')
const userCtrl = require('./controllers/user')
const authCtrl = require('./controllers/auth')
const userCardCtrl = require('./controllers/user.card')

const isAdmin = roleAuthorization('admin')

exports.listRouter = express
  .Router()
  .get('/full', authJwt, listCtrl.getFull)
  .get('/', authJwt, listCtrl.getAll)
  .post('/', authJwt, isAdmin, listCtrl.post)
  .put('/:id', authJwt, isAdmin, listCtrl.put)
  .delete('/:id', authJwt, isAdmin, listCtrl.delete)

exports.cardRouter = express
  .Router()
  .get('/', authJwt, cardCtrl.getAll)
  .post('/', authJwt, isAdmin, cardCtrl.post)
  .put('/:id', authJwt, isAdmin, cardCtrl.put)
  .delete('/:id', authJwt, isAdmin, cardCtrl.delete)

exports.authRouter = express
  .Router()
  .post('/register', authCtrl.register)
  .post('/login', authCredentials, authCtrl.login)

exports.userRouter = express
  .Router()
  .get('/', authJwt, userCtrl.getAll)
  .get('/:userId', authJwt, userCtrl.getById)
  .put('/:userId', authJwt, ownAccount, userCtrl.update)
  .delete('/:userId', authJwt, ownAccount, userCtrl.delete)
  .put('/:userId/role/:role', authJwt, isAdmin, userCtrl.setRole)

exports.userCardRouter = express
  .Router()
  .post('/:userId', authJwt, ownAccount, userCardCtrl.add)
  .put(
    '/:userId',
    authJwt,
    ownAccount,
    isCardAssociated,
    userCardCtrl.move
  )
  .get('/:userId', authJwt, ownAccount, userCardCtrl.get)
