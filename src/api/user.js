const config = require("../config");
const express = require("express");
const cors = require("cors");
var sqlite = require('sqlite3').verbose();
const app = express();
var md5 = require('md5');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

//code for opening a DB can be located in other file and imported here
const mydb = new sqlite.Database(config.dbUri, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('SQLite DB connected');
  }}
);

app.get("/users", (req, res) => {
    mydb.all("SELECT * FROM users", (err, rows) => {
      rows.forEach((row) => {
        console.log(row.num, row.name);
      });
      res.send(JSON.stringify(rows));
    })   
});

app.post("/users", (req, res) => {
  const data = req.body;
  console.log("data received from React: " + JSON.stringify(data));

  if (data.username != "" && data.email != "" && data.password != "") {
    let insertQ = "INSERT INTO users(username, email, password) VALUES(?, ?, ?);";
    mydb.run(insertQ, [data.username, data.email, md5(data.password)], (err) => {
      if (err) throw err;
      console.log("a user row inserted");
    });
    res.send({status: 200}); //success code
  } else {
    res.send({status: 500}); //failure code
  }  
});

let port = 4000;
app.listen(port, function() {
    console.log("Server started on " + port);
});
