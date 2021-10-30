const product = require('../models/Product');
const path = require('path');
class AdminController {

    // [GET] - /admin - admin home page show list products
    index(req, res, next) {
        res.sendFile(path.join(__dirname, '../../admin/html/', 'index.html'));
    }
    // [GET] - /admin/getProducts
    getProducts(req, res, next) {
        product.find({})
            .lean()
            .then(products => {
                res.render('admin/products-stored', {
                    layout: 'admin',
                    title: 'Trang quản trị',
                    products
                })
            })
            .catch(next)
    }
    // [GET] - /admin/Product/create
    
}

module.exports = new AdminController();