const productRoute = require('./product.route');
const express = require('express');


function route(app){

    app.use('/products', productRoute)

    app.get('/admin', function (req, res){
      res.render('admin');
    })

    app.get('/', function (req, res) {
      res.render('home');
    })

    app.get('/about', function (req, res) {
      res.send('About birds')
    })
}


module.exports = route