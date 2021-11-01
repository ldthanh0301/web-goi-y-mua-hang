const staffController = require('../app/controllers/StaffController'); 
const express = require('express');
const router = express.Router();

router.get('/',staffController.index)
router.get('/login',staffController.login)
router.post('/login',staffController.confirmLogin)
router.get('/create',staffController.create)
router.post('/store',staffController.store)

module.exports = router;