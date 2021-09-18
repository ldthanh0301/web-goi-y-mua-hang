const productRoute = require('./product.route');
const adminRoute = require('./admin.route');
const siteRoute = require('./site.route');
const express = require('express');
const { connect } = require('mongoose');


function route(app){

    app.use('/products', productRoute)

    app.use('/admin', adminRoute)

    app.use('/', siteRoute);

    
}


module.exports = route