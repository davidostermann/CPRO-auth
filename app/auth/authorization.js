const User = require('../models/user')

const authorizationErr = 'You are not authorized to view this content'

/**
 * Expose le middleware qui vérifie que 
 * le rôle du user authentifié (req.user.roletype)
 * est bien dans les rôles authorisés (roles)
 * @param {array} roles
 */
exports.roleAuthorization = (...roles) => (req, res, next) => {

  // Grâce au middleware authJwt, on récupere le user
  if (roles.indexOf(req.user.roletype) > -1) {
    return next()
  } else {
    res.status(401).json({ error: authorizationErr })
    return next('Unauthorized')
  }
}

/**
 * Expose le middleware qui vérifie que 
 * le user authentifié (req.user.id)
 * est bien le propriétaire du compte (req.params.userId)
 */
exports.ownAccount = (req, res, next) => {
  // Grâce au middleware authJwt, on récupere le user
  const isAdmin = req.user.roletype === 'admin'
  const isOwner = req.user.id === +req.params.userId
  if (isAdmin || isOwner) {
    return next()
  } else {
    res.status(401).json({ error: authorizationErr })
    return next('Unauthorized')
  }
}

/**
 * Expose le middleware qui vérifie que 
 * le userId (req.params.userId)
 * est bien associé à la carte (req.params.cardId)
 */
exports.isCardAssociated = (req, res, next) => {
  // Grâce au middleware authJwt, on récupere le user
  if (req.user.roletype === 'admin') {
    return next()
  }
  
  User.isCardOwner({ userId: req.params.userId, cardId: req.params.cardId })
    .then(() => next())
    .catch(err => {
      res.status(401).json(err)
      return next(err.error)
    })
}
