const adminController = require('../app/controllers/AdminController');
const express = require('express');
const router = express.Router();

router.get('/',adminController.index)

module.exports = router;