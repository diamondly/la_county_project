// Employee model
const db = require('./db');

// Employee model and methods
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM employees;", (err, rows) => {
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

//to get only one employee row by employee id
const getOne = (eid) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM employees WHERE id = ?;", [eid], (err, rows) => {
      if (err) {
        console.log("Select error in getOne: " + err.message);
        throw err;
      } else {
        resolve(JSON.stringify(rows)); 
      }
    });
  });
}

const exist = (eid) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM employees WHERE id = ?;", [eid], (err, rows) => {
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
    
const add = (eid, fName, lName, email, phone) => {
  return new Promise((resolve, reject) => {
    let qry = "INSERT INTO employees(id, fName, lName, email, phone) VALUES(?, ?, ?, ?, ?);";
    db.run(qry, [eid, fName, lName, email, phone], (err) => {
      if (err) {
        console.log("Insert error in add: " + err.message);
        throw err;
      } else {
        // console.log("An employee info: " + data.id + " " + data.fName + " inserted");
        resolve(true);
      }
    });
  });
}

const update = (eid, fName, lName, email, phone) => {
  return new Promise((resolve, reject) => {
    let qry = "UPDATE employees SET id = ?, fName = ?, lName = ?, email = ?, phone = ? WHERE id = ?;";
    db.run(qry, [eid, fName, lName, email, phone, eid], (err) => {
      if (err) {
        console.log("Update error in update: " + err.message);
        throw err;
      } else {
        //console.log("An employee info updated: " + data.fName + " " + data.lName);
        resolve(true);
      }   
    });
  });
}

const remove = (eid) => {
  return new Promise((resolve, reject) => {
    let qry = "DELETE FROM employees WHERE id = ?;";
    db.run(qry, [eid], (err) => {
      if (err) {
        console.log("Delete error in remove: " + err.message);
        throw err;
      } else {
        //console.log("An employee info deleted");
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
