const authController = require('../app/controllers/AuthController'); 
const express = require('express');
const router = express.Router();

router.get('/admin/login',authController.loginAdmin)
router.get('/user/login',authController.loginUser)
router.post('/admin/login',authController.confirmStaffLogin)


module.exports = router;