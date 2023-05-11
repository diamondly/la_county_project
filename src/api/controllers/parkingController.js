// Controllers will do all the necessary work, coordinating between frontend React pages and models (database)
const Parking = require('../models/ParkingLot'); // Import parking data models

// get all the rows from parking_lot table
const get_allParking = async(req, res) => { 
  rows = await Parking.getAll();
  //console.log('Data from allParking: ' + rows);
  res.send(rows);
};

//get only one row of the dept table
const get_parking = async(req, res) => {
  let pnum = req.params.pnum;
  console.log("get one data received from React num: " + pnum);
  if (pnum != "" && pnum != "undefined") {
      row = await Parking.getOne();
      if (row.length > 0) {
        console.log('A row of parking_lot data: ' + row);
        res.send(row);
      } else {
        console.log('No such parking_lot data: ' + pnum);
        res.send({status: 19});
      };
  } else {
    console.log("Invalid parking_lot number error in get parking");
    res.send({status: 500}); //failure code
  }
};

const post_parking = async(req, res) => {
  const data = req.body;
  console.log("post data received from React: " + JSON.stringify(data));
  if (data.pnum != "" && data.pname != "") {
      if (await Parking.exist(data.pnum)) { //if exist, then it will be upplicated
         console.log("Duplicate dept number error: " + data.pnum);
         res.send({status: 19});
      } else {
         await Parking.add(data.pnum, data.pname);
         res.send({status: 200});
      }
  } else {
    console.log("Invalid parking number and name error in post");
    res.send({status: 500}); //failure code
  }
};

const put_parking = async(req, res) => {
  const data = req.body;
  console.log("update data received from React: " + JSON.stringify(data));
  if (data.pnum != "" && data.pname != "") {
      if (await Parking.exist(data.pnum)) { //if exist, then update
         await Parking.update(data.pnum, data.pname);
         console.log("A parking_lot info: " + data.pnum + " " + data.pname + " updated");
         res.send({status: 200}); //success code
      } else {
         console.log("No such parking_lot number to update error: " + data.pnum);
         res.send({status: 19});
      }
  } else {
    console.log("Invalid parking number and name error in update");
    res.send({status: 500}); //failure code
  }
}

const delete_parking = async(req, res) => {
  let pnum = req.params.pnum;
  console.log("delete-data received from React num: " + pnum);
  if (pnum != "" && pnum != "undefined") {
      if (await Parking.exist(pnum)) { //if exist, then delete
          await Parking.remove(pnum);
          console.log(`A parking_lot info pnum ${pnum} deleted`);
          res.send({status: 200}); //success code
      } else {
          console.log("No such parking_lot number error in delete: " + pnum);
          res.send({status: 19});
      }
  } else {
    console.log("Empty data error in delete");
    res.send({status: 500}); //failure code
  }
};
   
module.exports = {
  get_allParking, 
  get_parking,
  post_parking,
  put_parking,
  delete_parking
}
