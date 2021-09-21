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
                    products,
                    filter:true
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

    // [POST] - /products/store - store info product new
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

    // [GET] - /products/:slug/show - show info product
    show(req, res, next) {
        product.findOne({slug: req.params.slug})
            .lean()
            .then(product => {
                res.render('product/show', {
                    title: 'Chi tiết sản phẩm',
                    product,
                    filter:false
                })
            })
            .catch(next)
    }

    // [GET] - /products/:id/edit - show form edit
    edit(req, res, next) {
        product.findOne({_id: req.params.id})
            .lean()
            .then(product => {
                res.render('product/edit',{
                    title: 'Chỉnh sửa thông tin sản phẩm',
                    product
                });
            })
            .catch(next)
    }
    // [PUTCH] - /products/:id/update - save info product edit
    update(req, res, next) {
        let obj= {}
        if(req.body.image){
            Object.assign(obj,{
                image: req.body.image,    
            })
        }
        product.updateOne({_id: req.params.id},
            Object.assign(obj,{
                name: req.body.name,    
                description: req.body.description,    
                slug: slugify(req.body.name),    
                price: req.body.price,    
                value: req.body.value,    
            }))
            .then(product => product ? res.send('thành công'):res.send('lỗi'))
            .catch(err => {
                res.send('lỗi')
            })
    }
    // [POST] - /products/handle-form-suggest - handle form suggest products 
    handleFormSuggest(req, res, next) { 
        const dataFormSuggest = req.body;
        const producsQuey = product.find({}).lean();
        const quantity  = req.body.quantity;
        const amoutOfMoney = req.body.amoutOfMoney;
        let balance = 0;
        function caibalo(products,amoutOfMoney) {
            const productsSuggest =products.filter(product => {
                if (amoutOfMoney > product.price) {
                    amoutOfMoney -= product.price
                    return product
                }
            })
            balance = amoutOfMoney;
            return productsSuggest
        }
        if (req.body.productValue)
            producsQuey.sort({[req.body.productValue]:'desc'})
                .then(productsSorted => {
                    const productsSuggest = caibalo(productsSorted,amoutOfMoney);
                    res.render('product/suggest',{
                        title: 'Gợi ý mua hàng',
                        products: productsSuggest,
                        filter:true,
                        dataFormSuggest,
                        dataFormSuggestJSON:JSON.stringify(dataFormSuggest),
                        balance
                    })
                })
                .catch(next)
    }

    // [GET] - /products/search?q=
    search(req, res, next) {
        product.find({$text: {$search: req.query.q}})
        .limit(10)
        .exec(function(err, data) { 
            res.status(200).json({data})
        })
    }
   
}

module.exports = new ProductController();