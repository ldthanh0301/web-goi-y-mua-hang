const productController = require('../app/controllers/ProductController'); 
const express = require('express');
const router = express.Router();

router.get('/:slug/show', productController.show);
router.post('/store', productController.store);
router.get('/create', productController.create);
router.get('/', productController.index);

module.exports = router;