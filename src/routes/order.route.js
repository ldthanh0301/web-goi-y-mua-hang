const orderController = require('../app/controllers/orderController'); 
const express = require('express');
const router = express.Router();

router.get('/',orderController.index)
router.post('/create',orderController.create)
router.post('/store',orderController.store)
router.post('/save',orderController.save)
router.post('/test',orderController.test)
router.get('/:id/edit',orderController.edit)
router.put('/:id/update',orderController.update)
router.delete('/:id',orderController.delete)

module.exports = router;