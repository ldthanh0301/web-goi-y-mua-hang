const product = require('../models/Product');
const slugify = require('slugify');

class ProductController {
    // [GET] - /products/ - show list products
    index(req, res, next) {
        product.find({})
            .lean()
            .then(products=>{
                res.render('product/index',{
                    title: 'Danh sách sản phẩm',
                    products
                })
            })
            .catch(next)
    }
    
    // [GET] - /products/create - show form create
    create(req, res, next) {
        res.render('product/create',{
            title: 'Thêm sản phẩm mới'
        });
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

    // [GET] - /products/:slug/detail - show info product
    show(req, res, next) {
        product.findOne({slug: req.params.slug})
            .lean()
            .then(product => {
                res.render('product/show', {
                    title: 'Chi tiết sản phẩm',
                    product
                })
            })
            .catch(next)
    }

}

module.exports = new ProductController();