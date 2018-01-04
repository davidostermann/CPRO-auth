const { Client } = require('pg');
const db = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://dost:changeme@localhost:5432/trellodb'
})

db.connect((err) => {
  if (err) {
    return console.log(err)
  }
  console.log('DB CONNECTED !!!!')
})

db.unwrapQuery = (sql) => {
  return db.query(sql)
  .then( results => results.rows )
}

module.exports = db