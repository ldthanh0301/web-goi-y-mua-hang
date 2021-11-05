const Order = require('../models/Order');
const Product = require('../models/Product');
const slugify = require('slugify');

class ProductController {
    // [GET] - /orders/ - show list orders
    index(req, res, next) {
        Order.find({})
            .lean()
            .then(orders=>{
                res.render('order/index',{
                    layout:'admin',
                    title: 'Danh sách các đơn hàng',
                    orders,
                    user: req.session.user
                })
            })
            .catch(next)
    }
    
    // [POST] - /orders/create - đặt hàng
    create(req, res, next) {
        let  productsId = req.body.products;
        let  productsSL = req.body.quantitys;
        let products=[]
        let promise = productsId.map ((productId,index) => {
            return Product.findOne({_id: productId})
                    .lean()
                    .then(product => {
                        products.push(Object.assign(product,{sl: productsSL[index]}))
                    })
                    .catch(next)
        })
        
        Promise.all(promise)
            .then((result)=> {
                let total = products.reduce((sum,e) =>sum+(e.price * e.sl),0)
                res.render('order' ,{
                    products: products,
                    filter:false,
                    total,
                    user: req.session.user
                })
            })
    }
    
    // [POST] - /orders/store - store info product new
    store(req, res, next) {
        let productsId = req.body.productId;
        let productsSL = req.body.quantity;
        let address = req.body.address;
        let phoneNumber = req.body.phoneNumber;
        let name = req.body.name;

        let products = productsId.map((id, i)=> {
            return {
                product: id,
                quantity: productsSL[i]
            }
        })
        let obj = {
            name,
            phoneNumber,
            products,
            address
        }
        if (req.session.user) {
            Order.create({
                userID:  req.session.user.username, 
                detail: obj,
                status: 0
            })
            .then(result => {
                res.json({
                    status: 1,
                    message:"Tạo thành công"
                })
                return
            })
            .catch(next)
        }else {
            Order.create({
                userID:null, 
                detail: obj,
                status: 0
            }).then(result => {
                res.json({
                    status: 1,
                    message:"Tạo thành công"
                })
                return
            })
            .catch(next)
        }
    }
    save(req, res, next) {
        let productsId = req.body.productId;
        let productsSL = req.body.quantity;
        let address = req.body.address;
        let phoneNumber = req.body.phoneNumber;
        let name = req.body.name;
        let user =null;
        console.log('debug', name)
        let products = productsId.map((id, i)=> {
            return {
                product: id,
                quantity: productsSL[i]
            }
        })
        if (req.session.user) {
            user =  req.session.user;
        }
        Order.create({
            name,
            address,
            phoneNumber,
            status: 0,
            quantity: products.length,
            user,
            products
        })
        .then(result => {
            Order.findOne({_id : result._id})
            .populate('products.product')
            .then(order => {
                products = order.products;
                let total = products.reduce((sum,e)=>sum + (e.quantity* e.product.price),0);
                Order.updateOne({_id:result._id},{totalPrice : total})
                .then(rs => {
                    res.json({
                        status: 1,
                        message:"Tạo thành công"
                    })
                    return
                })
            })
        })
        .catch(next)
    }

    // [GET] - /orders/:slug/show - show info product
    show(req, res, next) {
        Order.findOne({slug: req.params.slug})
            .lean()
            .then(product => {
                res.render('product/show', {
                    title: 'Chi tiết đơn hàng',
                    product,
                    filter:false,
                    user: req.session.user
                })
            })
            .catch(next)
    }

    // [GET] - /orders/:id/edit - show form edit
    edit(req, res, next) {
        Order.findOne({_id: req.params.id})
            .populate('products.product')
            .lean()
            .then(order => {
                // res.json(order)
                res.render('order/edit',{
                    layout: 'admin',
                    title: 'Chỉnh sửa thông tin đơn hàng',
                    order,
                    user: req.session.user
                });
            })
            .catch(next)
    }
    // [PUTCH] - /orders/:id/update - save info product edit
    update(req, res, next) {
       
        Order.updateOne({_id: req.params.id},{status:req.body.status})
            .then(order => {
                res.render('order/edit',{
                    layout:"admin",
                    title: 'Chỉnh sửa thông tin đơn hàng',
                    isdefined: true,
                    isCreate:true,
                    order,
                    user: req.session.user
                });
            })
            .catch(err => {
                res.render('order/edit',{
                    layout:"admin",
                    title: 'Chỉnh sửa thông tin đơn hàng',
                    isdefined: true,
                    isCreate: false,
                    order,
                    user: req.session.user
                });
            })
    }
    //  [DELETE] - /orders/:id/ - delete order
    delete (req, res, next) {
        const id = req.params.id;
        Order.deleteOne({_id : id}).then (
            res.redirect('back')
        ).catch (next);
    }
    test(req, res, next) {
        console.log('data',req.body.productId)
        res.json(req.body)
    }
}

module.exports = new ProductController();