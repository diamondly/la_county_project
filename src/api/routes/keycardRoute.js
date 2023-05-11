//employees routes
const express = require('express');
const router = express.Router();
const keycardController = require('../controllers/keycardController');

//Routing to al the relevant controllers
router.get('/allKeycards', keycardController.get_allKeycards);
router.get('/:eid', keycardController.get_keycards);
router.post('/', keycardController.post_keycards);
router.put('/', keycardController.put_keycards);
router.delete('/:eid', keycardController.delete_keycards);

module.exports = router;
