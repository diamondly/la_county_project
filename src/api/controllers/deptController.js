// Controllers will do all the necessary work, coordinating between frontend React pages and models (database)
const Dept = require('../models/Dept'); // Import dept data models

// get all the rows from dept table
const get_allDepts = async(req, res) => { 
  rows = await Dept.getAll();
  //console.log('Data from allDepts: ' + rows);
  res.send(rows);
};

//get only one row of the dept table
const get_dept = async(req, res) => {
  let dnumber = req.params.dnumber;
  console.log("get one data received from React num: " + dnumber);
  if (dnumber != "" && dnumber != "undefined") {
      row = await Dept.getOne();
      if (row.length > 0) {
        console.log('A row of dept data: ' + row);
        res.send(row);
      } else {
        console.log('No such dept data: ' + dnumber);
        res.send({status: 19});
      };
  } else {
    console.log("Invalid department number error in get dept");
    res.send({status: 500}); //failure code
  }
};

const post_dept = async(req, res) => {
  const data = req.body;
  console.log("post data received from React: " + JSON.stringify(data));
  if (data.dnumber != "" && data.dname != "") {
      if (await Dept.exist(data.dnumber)) { //if exist, then it will be upplicated
         console.log("Duplicate dept number error: " + data.dnumber);
         res.send({status: 19});
      } else {
         await Dept.add(data.dnumber, data.dname);
         res.send({status: 200});
      }
  } else {
    console.log("Invalid department number and name error in post");
    res.send({status: 500}); //failure code
  }
};

const put_dept = async(req, res) => {
  const data = req.body;
  console.log("update data received from React: " + JSON.stringify(data));
  if (data.dnumber != "" && data.dname != "") {
      if (await Dept.exist(data.dnumber)) { //if exist, then update
         await Dept.update(data.dnumber, data.dname);
         console.log("A dept info: " + data.dnumber + " " + data.dname + " updated");
         res.send({status: 200}); //success code
      } else {
         console.log("No such dept number to update error: " + data.dnumber);
         res.send({status: 19});
      }
  } else {
    console.log("Invalid department number and name error in update");
    res.send({status: 500}); //failure code
  }
}

const delete_dept = async(req, res) => {
  let dnumber = req.params.dnumber;
  console.log("delete-data received from React num: " + dnumber);
  if (dnumber != "" && dnumber != "undefined") {
      if (await Dept.exist(dnumber)) { //if exist, then delete
          await Dept.remove(dnumber);
          console.log(`A dept info dnumber ${dnumber} deleted`);
          res.send({status: 200}); //success code
      } else {
          console.log("No such dept number error in delete: " + dnumber);
          res.send({status: 19});
      }
  } else {
    console.log("Empty data error in delete");
    res.send({status: 500}); //failure code
  }
};
   
module.exports = {
  get_allDepts, 
  get_dept,
  post_dept,
  put_dept,
  delete_dept
}
