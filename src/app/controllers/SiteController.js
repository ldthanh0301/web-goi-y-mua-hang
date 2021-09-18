const product = require("../models/Product")

class SiteController {
    // [GET] - / - show home page
    index(req, res, next) {
        product.find({})
            .lean()
            .then(products=>res.render('home',{products}))
            .catch(next)
    }

}

module.exports = new SiteController()