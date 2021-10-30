const adminController = require('../app/controllers/AdminController');
const productController = require('../app/controllers/ProductController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/../public/img/products/'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now().toString().slice(5);
      const ext = file.originalname.split('.').pop();
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
});
const  upload = multer({storage: storage});
router.get('/',adminController.getProducts)
router.get('/product/create',productController.create)
router.post('/handle-form-suggest', productController.handleFormSuggest);
router.post('/product/store',upload.array('images'),function(req,res,next) {
    let path = req.files.map(file => {
      let path =file['path']
      path = path.split('public');
      path =path.pop();
      return path;
    });
    req.body.images = path;
    next();
},productController.store)

module.exports = router;