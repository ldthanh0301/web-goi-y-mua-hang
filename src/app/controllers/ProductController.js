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
            layout: 'admin',
            title: 'Thêm sản phẩm mới'
        });
    }

    // [POST] - /products/store - store info product new
    store(req, res, next) {
        console.log(req.body.image);
        product.create({
            name: req.body.name,
            description: req.body.description,
            images: req.body.images,
            price: req.body.price,
            value: req.body.value,
            unitPrice: req.body.price /req.body.value,
            quantity: req.body.quantity,
            slug: slugify(req.body.name,{
                lower:true
            })
        })
        .then(products=>res.render('product/create',{
            layout: 'admin',
            isCreate:true
        }))
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
        if(req.body.images){
            Object.assign(obj,{
                images: req.body.images,    
            })
        }
        product.updateOne({_id: req.params.id},
            Object.assign(obj,{
                name: req.body.name,    
                description: req.body.description,    
                slug: slugify(req.body.name),    
                price: req.body.price,    
                value: req.body.value,    
                unitPrice: (req.body.value /req.body.price) *100,
                quantity: req.body.quantity,    
            }))
            .then(product => product ? res.send('thành công'):res.send('lỗi'))
            .catch(err => {
                res.send('lỗi')
            })
    }
    // [POST] - /products/handle-form-suggest - handle form suggest products 
    handleFormSuggest(req, res, next) { 
        const dataFormSuggest = req.body;
        const producsQuery = product.find({}).lean();
        const quantity  =parseInt(req.body.quantity);
        const amoutOfMoney = req.body.amoutOfMoney;
        let balance = 0;
        
        if (req.body.productValue){
            // sắp xếp lại danh sách sản phẩm theo trường đc chọn
            producsQuery.sort({[req.body.productValue]:'desc'})
                .then(productsSorted => {
                    const productsSuggest = caibalo(productsSorted,amoutOfMoney,quantity);
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
        function caibalo(products,amoutOfMoney,isMany=0) {
            const productsSuggest = products.filter(product => {
                let sl =0;
                if (!isMany) {
                    while (amoutOfMoney > product.price && sl < product.quantity ) {
                        amoutOfMoney -= product.price;
                        sl++;
                    }
                } else {
                    if (amoutOfMoney > product.price) {
                        amoutOfMoney -= product.price;
                        sl++;
                    }
                }
                // số lượng > 0 mới trả về
                if (sl) {
                    return Object.assign(product,{sl});
                }
            })
            balance = amoutOfMoney;
            return productsSuggest
        }
        
    }

    // [GET] - /products/search?q=
    search(req, res, next) {
        product.find({$text: {$search: req.query.q}})
        .limit(10)
        .exec(function(err, data) { 
            res.status(200).json({data})
        })
    }
    //  [DELETE] - /products/:id/ - delete product
    delete (req, res, next) {
        const id = req.params.id;
        product.deleteOne({_id : id}).then (
            res.redirect('back')
        ).catch (next);
    }
}

module.exports = new ProductController();