const product = require('../models/Product');

class AdminController {

    // [GET] - /admin - admin home page show list products
    index(req, res, next) {
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
}

module.exports = new AdminController();