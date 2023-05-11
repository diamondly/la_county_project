//dept routes
const express = require('express');
const router = express.Router();
const deptController = require('../controllers/deptController');

//Routing to al the relevant controllers
router.get('/allDepts', deptController.get_allDepts);
router.get('/:dnumber', deptController.get_dept);
router.post('/', deptController.post_dept);
router.put('/', deptController.put_dept);
router.delete('/:dnumber', deptController.delete_dept);

module.exports = router;
