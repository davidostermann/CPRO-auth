const user = require("../models/user");
const { compare } = require("./pwd");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/**
 * BAD !!! passport ne permet pas d'envoyer un message d'erreur custom
 * @param {*} email
 * @param {*} passwordEnClair
 * @param {*} done
 */
const checkCredentials = (email, passwordEnClair, done) => {
  return user
    .getByEmail(email)
    .then(
      user =>
        user
          ? compare(passwordEnClair, user.password).then(
              isMatch =>
                isMatch ? done(null, user) : done(null, false, "bad password")
            )
          : done(null, false, "bad email")
    )
    .catch(err => done(err));
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    checkCredentials
  )
);

// expose le middleware qui valide le login
exports.authCredentials = passport.authenticate("local", {
  session: false
});
