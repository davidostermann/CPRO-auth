# CPRO-auth
authentification / role avec passport &amp; jwt

## 1. install

npm i -S bcrypt-nodejs jsonwebtoken morgan passport passport-jwt passport-local dotenv

## 2. password

### Créer les fonctions d'encodage et de comparaison de password

cf. [auth](./app/auth/pwd.js)

### Générer un pwd génréric

cf. [auth helper encodePassword](./app/auth/helper.js) 

## 3. BDD

Ajouter les champs email, pwd, role à la base
cf. [setup.sql l.38 à 60](./setup.sql)

Le pwd pourra être généré avec le [helper](./app/auth/helper.js)

## 4. modifier la creation de user

```javascript
const { encodePassword } = require('../auth/pwd') 
```

```javascript
createUser({ lastname, firstname, email, pwd }) {
  return encodePassword(pwd)
  .then(hash =>
    db.unwrapQuery(`
      INSERT INTO users(firstname, lastname, email, pwd, roletype)
      VALUES ('${firstname}', '${lastname}', 
      '${email}', '${hash}', 'user')`)
  );
}
```