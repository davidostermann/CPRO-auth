# CPRO-auth
authentification / role avec passport, jwt et bcrypt

## 1. install

npm i -S bcrypt-nodejs jsonwebtoken morgan passport passport-jwt passport-local dotenv

## 2. password

### Créer les fonctions d'encodage et de comparaison de password

cf. [auth](./app/auth/pwd.js)

### Générer un pwd générique pour populer la BDD

cf. [auth helper createGenericPassoword](./app/auth/helper.js) 

## 3. modifier la table user de la BDD

Ajouter les champs email, pwd, role à la table `user`
cf. [setup.sql l.38 à 60](./setup.sql)

Un pwd générique pourra être généré avec le [helper](./app/auth/helper.js)

## 5. ajouter 3 methodes au model user :

* `notExists(email)` pour vérifier qu'un utilisateur avec le même mail n'existe pas => utilisé à la creation de l'utilisateur (register)
* `getUserByEmail` pour récupérer le hash du password correspondant à l'email afin de le comparer avec le password envoyé => utilisé pour le login
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

## 7. créer une route pour le login

* qui utilise le middleware de passport-local
* qui génére et renvoie le token
* qui renvoie eventuellement les infos du user.

## 8. Créer les middlewares d'autorisation pour sécuriser les routes d'api

* Un pour limiter l'acces à l'admin
* Un pour limiter l'acces à l'owner du compte
* Un pour empecher un user de bouger une carte à laquelle il n'est pas associé

## 9. Refacto

* Créer un routes.js qui centralise les path, middleware et controller associés
* Extraire login et register du user pour faire un controller spécialisé dans l'authentification
* Créer un model et controller pour les action impliquant user et card afin d'alléger les model et controller de user

## 10. testes d'intégration => TODO

* Avec jest et super-test ?
* http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
* https://www.valentinog.com/blog/testing-api-koa-jest/
* https://medium.com/@linuk/unit-testign-rest-api-file-upload-with-jest-supertest-and-mz-in-node-ecbab9814aef
* https://github.com/juffalow/express-jwt-example Mocha / chai mais bon exemple
* https://github.com/Shyam-Chen/Backend-Starter-Kit intéressant
* https://www.snip2code.com/Snippet/248401/Supertest-authenticate-with-bearer-token utilise le login pour recuperezr le token

## 10. valider les inputs client sur les routes => TODO

* avec JOI
* ou avec express-validator

## 11. Centraliser et normaliser la gestion d'erreur => TODO

## 12. Securiser le server avec Helmet => TODO

Attention en particulier aux injection SQL. Mais il y plein d'autres attaques possibles.

# 12. Mettre un trigger postgres sur :

* le onDelete d'une list pour mettre toutes les user.cards de cette liste sur la liste par défaut.

## 13. Pour aller plus loin dans les autorisations

* https://github.com/OptimalBits/node_acl
