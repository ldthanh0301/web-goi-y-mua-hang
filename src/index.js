const express = require('express')
const route = require('./routes/index.route')
const exphbs  = require('express-handlebars');
const path = require('path');
const db = require('./app/config/db')

const app = express()
const port = 3000

// parsing req.body
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

// set static file

app.use(express.static(path.join(__dirname,'public')))

// set view engine là handlebars

app.engine('hbs',  exphbs({
  extname: '.hbs',
  helpers: {
    isdefined: function(value){
       return value !== undefined;
    }
  }
}))

app.set('views', path.join(__dirname,'resources/views'))
app.set('view engine', 'hbs')

// connect db
db.connect()

// cấu hình router
route(app)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
