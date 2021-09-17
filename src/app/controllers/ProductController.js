const product = require('../models/Product');
const slugify = require('slugify');

class ProductController {
    // [GET] - /products/ - show list products
    index(req, res, next) {
        product.find({})
            .lean()
            .then(products=>{
                res.render('product/index',{products:products})
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
            slug: slugify(req.body.name,{
                lower:true
            })
        })
        .then(products=>res.render('product/create',{isCreate:true}))
        .catch(err=>{
            res.render('product/create',{isCreate:false})
            next(err)
        })
    }

    // [GET] - /products/detail - show info product
    show(req, res, next) {
        res.render('product/detail')
    }

}

module.exports = new ProductController();