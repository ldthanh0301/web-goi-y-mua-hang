const productRoute = require('./product.route');
const staffRoute = require('./staff.route');
const userRoute = require('./user.route');
const adminRoute = require('./admin.route');
const orderRoute = require('./order.route');
const siteRoute = require('./site.route');
const authMiddleware = require('../app/middleware/auth.middleware');
const express = require('express');
const { connect } = require('mongoose');


function route(app){

    app.use('/products', productRoute)

    app.use('/staff', staffRoute)
    app.use('/user', userRoute)
    app.use('/orders', orderRoute)
    app.use('/admin',authMiddleware.requireAuth, adminRoute)
    app.use('/admin/orders', orderRoute)
    app.use('/admin/staffs',authMiddleware.requireAuth, staffRoute)

    
    app.use('/', siteRoute);

}


module.exports = route