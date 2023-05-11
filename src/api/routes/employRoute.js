//employees routes
const express = require('express');
const router = express.Router();
const employController = require('../controllers/employController');

//Routing to al the relevant controllers
router.get('/allEmployees', employController.get_allEmployees);
router.get('/:eid', employController.get_employees);
router.post('/', employController.post_employees);
router.put('/', employController.put_employees);
router.delete('/:eid', employController.delete_employees);

module.exports = router;
