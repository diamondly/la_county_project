//ParkingLot model
const db = require('./db');

//ParkingLot model and methods
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM parking_lot;", (err, rows) => {
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
const getOne = (pnum) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM parking_lot WHERE num = ?;", [pnum], (err, rows) => {
      if (err) {
        console.log("Select error in getOne: " + err.message);
        throw err;
      } else {
        resolve(JSON.stringify(rows)); 
      }
    });
  });
}

const exist = (pnum) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM parking_lot WHERE num = ?;", [pnum], (err, rows) => {
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
    
const add = (pnum, pname) => {
  return new Promise((resolve, reject) => {
    let qry = "INSERT INTO parking_lot(num, name) VALUES(?, ?);";
    db.run(qry, [pnum, pname], (err) => {
      if (err) {
        console.log("Insert error in add: " + err.message);
        throw err;
      } else {
        //console.log("Parking lot info: " + data.number + " " + data.name + " inserted");
        resolve(true);
      }
    });
  });
}

const update = (pnum, pname) => {
  return new Promise((resolve, reject) => {
    let qry = "UPDATE parking_lot SET num = ?, name = ? WHERE num = ?;";
    db.run(qry, [pnum, pname, pnum], (err) => {
      if (err) {
        console.log("Update error in update: " + err.message);
        throw err;
      } else {
        //console.log("Parking lot info updated: " + data.name);
        resolve(true);
      }   
    });
  });
}

const remove = (pnum) => {
  return new Promise((resolve, reject) => {
    let qry = "DELETE FROM parking_lot WHERE num = ?;";
    db.run(qry, [pnum], (err) => {
      if (err) {
        console.log("Delete error in remove: " + err.message);
        throw err;
      } else {
        //console.log("Parking lot info deleted");
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
