const productRoute = require('./product.route');
const siteRoute = require('./site.route');
const express = require('express');
const { connect } = require('mongoose');


function route(app){

    app.use('/products', productRoute)

    app.get('/admin', function (req, res){
      res.render('admin');
    })

    app.use('/', siteRoute);

    
}


module.exports = route