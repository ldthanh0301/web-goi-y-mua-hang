const product = require("../models/Product")

class SiteController {
    // [GET] - / - show home page
    index(req, res, next) {
        product.find({})
            .lean()
            .then(products=>res.render('home',{
                products,
                filter:true,
                user: req.session.user
            }))
            .catch(next)
    }

    // [GET] - /payment?id= - show form payment with product id
    payment(req, res, next) {
        product.find({_id: req.query.id})
            .lean()
            .then(products => {
                res.render('payment' ,{
                    products:products,
                    filter:false
                })
            })
            .catch(next)
    }
    login(req, res, next) {
        res.render('login',{
            layout:''
        });
    }
    register(req, res, next) {
        res.render('register', {
            layout: ''
        })
    }
}

module.exports = new SiteController()