//dept routes
const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

//Routing to al the relevant controllers
router.get('/allParking', parkingController.get_allParking);
router.get('/:pnum', parkingController.get_parking);
router.post('/', parkingController.post_parking);
router.put('/', parkingController.put_parking);
router.delete('/:pnum', parkingController.delete_parking);

module.exports = router;
