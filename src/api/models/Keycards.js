//Keycard model
const db = require('./db');

//Dept model and methods
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM keycards;", (err, rows) => {
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

//to get only one keycard row by id
const getOne = (eid) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM keycards WHERE id = ?;", [eid], (err, rows) => {
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
    db.all("SELECT * FROM keycards WHERE id = ?;", [eid], (err, rows) => {
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
    
const add = (eid, dept_no, parking_lot_no, fName, lName, valid_from, valid_to) => {
  return new Promise((resolve, reject) => {
    let qry = "INSERT INTO keycards(id, dept_no, parking_lot_no, fName, lName, valid_from, valid_to) VALUES(?, ?, ?, ?, ?, ?, ?);";
    db.run(qry, [eid, dept_no, parking_lot_no, fName, lName, valid_from, valid_to], (err) => {
      if (err) {
        console.log("Insert error in add: " + err.message);
        throw err;
      } else {
        //console.log("An employee info: " + data.id + " " + data.fName + " inserted");
        resolve(true);
      }
    });
  });
}

const update = (eid, dept_no, parking_lot_no, fName, lName, valid_from, valid_to) => {
  return new Promise((resolve, reject) => {
    let qry = "UPDATE keycards SET id = ?, dept_no = ?, parking_lot_no = ?, fName = ?, lName = ?, valid_from = ?, valid_to = ? WHERE id = ?;";
    db.run(qry, [eid, dept_no, parking_lot_no, fName, lName, valid_from, valid_to], (err) => {
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
    let qry = "DELETE FROM keycards WHERE id = ?;";
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
