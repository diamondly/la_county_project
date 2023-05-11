//All the database related options
const sqlite = require('sqlite3').verbose();
const config = require('config'); //getting configuration parameters when deployed

//DB connection
const db = new sqlite.Database(config.get('db.name'), (err) => {
   if (err) {
      console.error(err.message);
      throw err;
   } else {
      console.log('SQLite DB connected');       
   }
});

module.exports = db;