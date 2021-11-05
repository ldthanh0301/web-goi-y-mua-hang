const product = require('../models/Product');
const path = require('path');
const Order = require('../models/Order');
class AdminController {

    // [GET] - /admin - admin home page show list products
    index(req, res, next) {
        res.sendFile(path.join(__dirname, '../../admin/html/', 'index.html'));
    }
    // [GET] - login 
    login(req, res, next) {
        res.render('admin/login', {
            layout:''
        });
    }
    // [GET] - /admin/products/
    getProducts(req, res, next) {
        product.find({})
            .lean()
            .then(products => {
                res.render('admin/products-stored', {
                    layout: 'admin',
                    title: 'Trang quản trị',
                    staff: req.session.staff,
                    products
                })
            })
            .catch(next)
    }
    // [GET] - /admin/Product/create
    getOrders(req,res,next) {
        Order.find({})
            .lean()
            .then(orders=>{
                res.render('admin/orders', {
                    layout: 'admin',
                    title: 'Quản lý nhân viên',
                    staff: req.session.staff,
                    orders
                })
            })

    }
}

module.exports = new AdminController();