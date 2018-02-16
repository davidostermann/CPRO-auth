const user = require("../models/user");
const { compare } = require("./pwd");

// exports.checkCredentials = (email, passwordEnClair) => {
//   return user
//     .getUserByEmail(email)
//     .then( user => { console.log('user : ', user); return user})
//     .then( user => { return user || Promise.reject({ error: "bad email" })})
//     .then( user => compare(passwordEnClair, user.password))
//     .then( isMatch => isMatch || Promise.reject({ error: "bad password" }))
//     .catch(err => Promise.reject(err));
// };

/**
 * NB : Je transforme checkCredentials afin de pouvoir renvoyer le user
 * @param {*} email
 * @param {*} password - pwd en clair
 */
const checkCredentials = (email, password) => {
  return user
    .getByEmail(email)
    .then(user => user || Promise.reject({ error: 'bad email' }))
    .then(user => compare(password, user.password).then(
        isMatch =>
          isMatch ? user : Promise.reject({ error: 'bad password' })
      )
    )
    .catch(err => Promise.reject(err))
};
// pour les tests
exports.checkCredentials = checkCredentials;

/**
 * Middleware pour express (cf. http://expressjs.com/fr/guide/using-middleware.html)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.checkCredentialsMiddleware = (req, res, next) => {
  const { email, password } = req.body; 
  checkCredentials(email, password)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => res.status(401).json(err));
};

// all in one
// exports.checkCredentialsMiddleware = (req, res, next) =>
//   user
//     .getUserByEmail(req.body.email)
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({ message: "bad email" });
//       }

//       compare(req.body.password, user.password).then(isMatch => {
//         if (!isMatch) {
//           res.status(401).json({ message: "bad password" });
//         }

//         req.user = user;
//         next();
//       });
//     })
//     .catch(err => next(err));
