const Product = require("../models/Product")
const Order = require("../models/Order")

class SiteController {
    // [GET] - / - show home page
    index(req, res, next) {
        Product.find({})
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
        Product.find({_id: req.query.id})
            .lean()
            .then(products => {
                res.render('payment' ,{
                    products:products,
                    filter:false,
                    user: req.session.user
                })
            })
            .catch(next)
    }
    // // [POST] - /getOrder - đặt hàng
    // getOrder(req, res, next) {
    //     let  productsId = req.body.products;
    //     let  productsSL = req.body.quantitys;
    //     let products=[]
    //     let promise = productsId.map ((productId,index) => {
    //             return Product.findOne({_id: productId})
    //                     .lean()
    //                     .then(product => {
    //                         products.push(Object.assign(product,{sl: productsSL[index]}))
    //                     })
    //                     .catch(next)
    //         })
       
    //     Promise.all(promise)
    //         .then((result)=> {
    //             res.render('order' ,{
    //                 products: products,
    //                 filter:false,
    //                 user: req.session.user
    //             })
    //         })
    // }
    // // [POST] - /storeOrder - đặt hàng
    // storeOrder(req, res, next) {
    //     let productsId = req.body.productId;
    //     let productsSL = req.body.quantity;
    //     let address = req.body.address;
    //     let phoneNumber = req.body.phoneNumber;
    //     let name = req.body.name;

    //     let products = productsId.map((id, i)=> {
    //         return {
    //             productsId: id,
    //             quantity: productsSL[i]
    //         }
    //     })
    //     let obj = {
    //         name,
    //         phoneNumber,
    //         products,
    //         address
    //     }
    //     if (req.session.user) {
    //         Order.create({
    //             customerId:  req.session.user.username, 
    //             detail: obj,
    //             status: 0
    //         })
    //         .then(result => {
    //             res.send("Đặt hàng thành công")
    //             return
    //         })
    //         .catch(next)
    //     }else {
    //         Order.create({
    //             customerId:  null, 
    //             detail: obj,
    //             status: 0
    //         }).then(result => {
    //             res.send("Đặt hàng thành công")
    //             return
    //         })
    //         .catch(next)
    //     }
       
    // }
    login(req, res, next) {
        res.render('user/login',{
            layout:''
        });
    }
    register(req, res, next) {
        res.render('user/register', {
            layout: ''
        })
    }
}

module.exports = new SiteController()