// Controllers will do all the necessary work, coordinating between frontend React pages and models (database)
const Employees = require('../models/Employees'); // Import employees data models

// get all the rows from Employees table
const get_allEmployees = async(req, res) => { 
  rows = await Employees.getAll();
  //console.log('Data from allEmployees: ' + rows);
  res.send(rows);
};

//get only one row of the employees table
const get_employees = async(req, res) => {
  let eid = req.params.eid;
  console.log("get one data received from React num: " + eid);
  if (eid != "" && eid != "undefined") {
      row = await Employees.getOne();
      if (row.length > 0) {
        console.log('A row of Employees data: ' + row);
        res.send(row);
      } else {
        console.log('No such Employees data: ' + eid);
        res.send({status: 19});
      };
  } else {
    console.log("Invalid id error in get Employees");
    res.send({status: 500}); //failure code
  }
};

const post_employees = async(req, res) => {
  const data = req.body;
  console.log("post data received from React: " + JSON.stringify(data));
  if (data.eid != "" && data.fName != "" && data.lName != "" && data.email != "" && data.phone != "") {
      if (await Employees.exist(data.eid)) { //if exist, then it will be upplicated
         console.log("Duplicate Employees number error: " + data.eid);
         res.send({status: 19});
      } else {
         await Employees.add(data.eid, data.fName, data.lName, data.email, data.phone);
         res.send({status: 200});
      }
  } else {
    console.log("Invalid employee id and name error in post");
    res.send({status: 500}); //failure code
  }
};

const put_employees = async(req, res) => {
  const data = req.body;
  console.log("update data received from React: " + JSON.stringify(data));
  if (data.eid != "" && data.fName != "" && data.lName != "" && data.email != "" && data.phone != "") {
      if (await Employees.exist(data.eid)) { //if exist, then update
         await Employees.update(data.eid, data.fName, data.lName, data.email, data.phone);
         console.log("A Employees info: " + data.eid + " " + data.fName + " " + data.lName + " " + data.email + " " + data.phone + " updated");
         res.send({status: 200}); //success code
      } else {
         console.log("No such Employee id to update error: " + data.eid);
         res.send({status: 19});
      }
  } else {
    console.log("Invalid employee id, name, email, and phone error in update");
    res.send({status: 500}); //failure code
  }
}

const delete_employees = async(req, res) => {
  let eid = req.params.eid;
  console.log("delete-data received from React num: " + eid);
  if (eid != "" && eid != "undefined") {
      if (await Employees.exist(eid)) { //if exist, then delete
          await Employees.remove(eid);
          console.log(`An employee info eid ${eid} deleted`);
          res.send({status: 200}); //success code
      } else {
          console.log("No such employee id error in delete: " + eid);
          res.send({status: 19});
      }
  } else {
    console.log("Empty data error in delete");
    res.send({status: 500}); //failure code
  }
};
   
module.exports = {
  get_allEmployees, 
  get_employees,
  post_employees,
  put_employees,
  delete_employees
}
