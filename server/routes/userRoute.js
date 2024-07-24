const express = require('express');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/users', userController.user)
router.get('/user/:id', userController.userById)
router.post('/user', userController.saveUser)
router.post('/users', authController.signup)
router.patch('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

module.exports = router;