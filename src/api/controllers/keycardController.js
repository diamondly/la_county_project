// Controllers will do all the necessary work, coordinating between frontend React pages and models (database)
const Keycards = require('../models/Keycards'); // Import employees data models

// get all the rows from Employees table
const get_allKeycards = async(req, res) => { 
  rows = await Keycards.getAll();
  //console.log('Data from allEmployees: ' + rows);
  res.send(rows);
};

//get only one row of the employees table
const get_keycards = async(req, res) => {
  let eid = req.params.eid;
  console.log("get one data received from React num: " + eid);
  if (eid != "" && eid != "undefined") {
      row = await Keycards.getOne();
      if (row.length > 0) {
        console.log('A row of Keycards data: ' + row);
        res.send(row);
      } else {
        console.log('No such Keycards data: ' + eid);
        res.send({status: 19});
      };
  } else {
    console.log("Invalid id error in get Keycards");
    res.send({status: 500}); //failure code
  }
};

const post_keycards = async(req, res) => {
  const data = req.body;
  console.log("post data received from React: " + JSON.stringify(data));
  if (data.eid != "" && data.dept_no != "" && data.parking_lot_no != "" && data.fName != "" && data.lName != "") {
      if (await Keycards.exist(data.eid)) { //if exist, then it will be upplicated
         console.log("Duplicate Keycards number error: " + data.eid);
         res.send({status: 19});
      } else {
         await Keycards.add(data.eid, data.dept_no, data.parking_lot_no, data.fName, data.lName, data.valid_from, data.valid_to);
         res.send({status: 200});
      }
  } else {
    console.log("Invalid keycard id and name error in post");
    res.send({status: 500}); //failure code
  }
};

const put_keycards = async(req, res) => {
  const data = req.body;
  console.log("update data received from React: " + JSON.stringify(data));
  if (data.eid != "" && data.dept_no != "" && data.parking_lot_no != "" && data.fName != "" && data.lName != "" && data.valid_from != "" && data.valid_to != "") {
      if (await Keycards.exist(data.eid)) { //if exist, then update
         await Keycards.update(data.eid, data.dept_no, data.parking_lot_no, data.fName, data.lName, data.valid_from, data.valid_to);
         console.log("A Keycards info: " + data.eid + " " + data.dept_no + " " + data.parking_lot_no + " " + data.valid_from + " " + data.valid_to + " updated");
         res.send({status: 200}); //success code
      } else {
         console.log("No such Keycard id to update error: " + data.eid);
         res.send({status: 19});
      }
  } else {
    console.log("Invalid keycard id, dept_no, parking_lot_no, valid_from, and valid_to error in update");
    res.send({status: 500}); //failure code
  }
}

const delete_keycards = async(req, res) => {
  let eid = req.params.eid;
  console.log("delete-data received from React num: " + eid);
  if (eid != "" && eid != "undefined") {
      if (await Keycards.exist(eid)) { //if exist, then delete
          await Keycards.remove(eid);
          console.log(`An keycard info eid ${eid} deleted`);
          res.send({status: 200}); //success code
      } else {
          console.log("No such keycard id error in delete: " + eid);
          res.send({status: 19});
      }
  } else {
    console.log("Empty data error in delete");
    res.send({status: 500}); //failure code
  }
};
   
module.exports = {
  get_allKeycards, 
  get_keycards,
  post_keycards,
  put_keycards,
  delete_keycards
}
