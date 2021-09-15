const express = require('express')

function route(app){
    // define the home page route
    app.get('/', function (req, res) {
      res.send('Birds home page')
    })
    // define the about route
    app.get('/about', function (req, res) {
      res.send('About birds')
    })
}

module.exports = route