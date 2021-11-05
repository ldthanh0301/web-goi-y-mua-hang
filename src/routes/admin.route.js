const adminController = require('../app/controllers/AdminController');
const productController = require('../app/controllers/ProductController');
const authController = require('../app/controllers/AuthController'); 

const express = require('express');
const router = express.Router();
const path = require('path');

const  upload = require('../app/middleware/product.middleware');
router.get('/',adminController.getProducts)
router.get('/login',adminController.login)
router.post('/login',authController.confirmStaffLogin)
router.get('/logout',authController.logoutAdmin)
router.get('/product/',adminController.getProducts)
router.get('/product/create',productController.create)
router.post('/handle-form-suggest', productController.handleFormSuggest);
router.post('/product/store',upload.upload.array('images'),upload.changePath,productController.store)

module.exports = router;