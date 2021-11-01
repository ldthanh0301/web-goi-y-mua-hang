const express = require('express');
const UserController = require('../app/controllers/UserController');
const AuthController = require('../app/controllers/AuthController');
const router = express.Router();

router.get('/',UserController.index)
router.get('/register',UserController.register);
router.post('/store',UserController.store)
router.get('/login',UserController.login)
router.get('/logout',AuthController.logoutUser)
router.post('/login',AuthController.confirmUserLogin)

module.exports = router;