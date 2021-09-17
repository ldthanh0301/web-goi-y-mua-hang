const product = require('../models/Product');

class ProductController {
    // [GET] - /products/ - show list products
    index(req, res, next) {
        product.find({})
            .then(products=>{
                res.json(products)
            })
            .catch(next)
    }
    
    // [GET] - /products/create - show form create
    create(req, res, next) {
        res.render('product/create');
    }

    // [POST] - /products/store - store info product
    store(req, res, next) {
        console.log(req.body.image);
        product.create({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            value: req.body.value,
        })
        .then(products=>res.render('product/create',{isCreate:true}))
        .catch(err=>{
            res.render('product/create',{isCreate:false})
            next(err)
        })
    }
}

module.exports = new ProductController();