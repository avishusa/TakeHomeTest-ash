const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);

router.get('/users/:id', userController.getUser);

router.put('/users/:id', userController.updateUser);

module.exports = router;
