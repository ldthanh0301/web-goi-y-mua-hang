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

    payment(req, res, next) {
        res.render('payment' ,{
            filter:false
        })
    }

}

module.exports = new SiteController()