require('dotenv').config()
const app = require('./app')

const port = process.env.PORT || 3000

app
  .listen(port, () => {
    console.log(`Connected server on port ${port} ( http://localhost:${port} )`)
  })
  .on('error', err => console.log('erreur de connexion : ', err))