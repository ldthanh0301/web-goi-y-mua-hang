const product = require("../models/Product")

class SiteController {
    // [GET] - / - show home page
    index(req, res, next) {
        product.find({})
            .lean()
            .then(products=>res.render('home',{
                products,
                filter:true
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

}

module.exports = new SiteController()