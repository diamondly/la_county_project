//Dept model
const db = require('./db');

//Dept model and methods
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM dept;", (err, rows) => {
      if (err) {
        console.log("Select error in getAll: " + err.message);
        throw err;
      } else {
        //console.log("rows length: " + rows.length);
        //console.log("rows: " + JSON.stringify(rows));
        resolve(JSON.stringify(rows)); 
      }
    });
  });
}

//to get only one department row by department number
const getOne = (dnumber) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM dept WHERE num = ?;", [dnumber], (err, rows) => {
      if (err) {
        console.log("Select error in getOne: " + err.message);
        throw err;
      } else {
        resolve(JSON.stringify(rows)); 
      }
    });
  });
}

const exist = (dnumber) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM dept WHERE num = ?;", [dnumber], (err, rows) => {
      if (err) {
        console.log("Select error in exist: " + err.message);
        throw err;
      } else {
        if (rows.length >= 1)
          resolve(true);
        else
          resolve(false);
      };
    });
  });
}
    
const add = (dnumber, dname) => {
  return new Promise((resolve, reject) => {
    let qry = "INSERT INTO dept(num, name) VALUES(?, ?);";
    db.run(qry, [dnumber, dname], (err) => {
      if (err) {
        console.log("Insert error in add: " + err.message);
        throw err;
      } else {
        //console.log("A dept info: " + data.number + " " + data.name + " inserted");
        resolve(true);
      }
    });
  });
}

const update = (dnumber, dname) => {
  return new Promise((resolve, reject) => {
    let qry = "UPDATE dept SET num = ?, name = ? WHERE num = ?;";
    db.run(qry, [dnumber, dname, dnumber], (err) => {
      if (err) {
        console.log("Update error in update: " + err.message);
        throw err;
      } else {
        //console.log("A dept info updated: " + data.name);
        resolve(true);
      }   
    });
  });
}

const remove = (dnumber) => {
  return new Promise((resolve, reject) => {
    let qry = "DELETE FROM dept WHERE num = ?;";
    db.run(qry, [dnumber], (err) => {
      if (err) {
        console.log("Delete error in remove: " + err.message);
        throw err;
      } else {
        //console.log("A dept info deleted");
        resolve(true);
      }   
    });
  });
}

module.exports = {
  getAll,
  getOne, 
  exist,
  add,
  update,
  remove
}
