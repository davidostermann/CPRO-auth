# CPRO-auth
authentification / role avec passport &amp; jwt

## 1. install

npm i -S bcrypt-nodejs jsonwebtoken morgan passport passport-jwt passport-local dotenv

## 2. password

### Créer les fonctions d'encodage et de comparaison de password

cf. [auth](./app/auth/index.js)

### Générer un pwd génréric

cf. [auth helper encodePassword](./app/auth/helper.js) 

## 3. BDD

Ajouter les champs email, pwd, role à la base
cf. [setup.sql l.38 à 60](./setup.sql)

## 4. modifier la creation de user