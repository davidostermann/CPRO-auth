# CPRO-auth
authentification / role avec passport &amp; jwt

## 1. install

npm i -S bcrypt-nodejs jsonwebtoken morgan passport passport-jwt passport-local dotenv

## 2. password

### Créer les fonctions d'encodage et de comparaison de password

cf. [auth](./app/auth/pwd.js)

### Générer un pwd génréric

cf. [auth helper createGenericPassoword](./app/auth/helper.js) 

## 3. BDD

Ajouter les champs email, pwd, role à la base
cf. [setup.sql l.38 à 60](./setup.sql)

Un pwd générique pourra être généré avec le [helper](./app/auth/helper.js)

## 5. ajouter 3 methodes au model user :

* `notExists(email)` pour la creation de l'utilisateur
* `getUserByEmail` pour le login
* `getUserById` pour la vérification du token

## 4. modifier la creation de user

* Ajouter les nouveaux champs (email , pwd, roletype)
* Verifier la présence de l'email
* Verifier la présence du password
* Verifier que l'utilisateur n'exite pas dejà : `notExists(email)`
* Encoder le password avant de l'insérer dans la base

## 6. Parametrer Passport

Créer un fichier auth/passport.js pour :
* initialiser une strategie pour le login : local
* initialiser une strategie pour les routes d'api et les routes front : jwt
* exposer les middlewares correspondants.


