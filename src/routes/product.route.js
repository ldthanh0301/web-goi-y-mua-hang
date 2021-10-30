const productController = require('../app/controllers/ProductController'); 
const express = require('express');
const router = express.Router();

router.get('/search',productController.search)
router.put('/:id/update', productController.update);
router.get('/:id/edit', productController.edit);
router.delete('/:id', productController.delete);
router.get('/:slug/show', productController.show);
router.post('/handle-form-suggest', productController.handleFormSuggest);
router.post('/store', productController.store);
router.get('/create', productController.create);
router.get('/', productController.index);

module.exports = router;