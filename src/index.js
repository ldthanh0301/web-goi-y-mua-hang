const express = require('express')
const route = require('./routes/index.route')
const exphbs  = require('express-handlebars');
const path = require('path');
const db = require('./app/config/db');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express()
const port = 3000;
// add session
app.use(cookieParser('login'))
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
// parsing req.body
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

// set static file

app.use(express.static(path.join(__dirname,'public')))

// sử dụng override method url ?_method=''
app.use(methodOverride('_method'));

// set view engine là handlebars

app.engine('hbs',  exphbs({
  extname: '.hbs',
  helpers: {
    isdefined: function(value){
      return value !== undefined;
    },
    sum: function(a, b) {
      return a + b;
    },
    multiplication: function(a, b) {
      return a * b;
    },
    toNumber: function(a){
      return parseInt(a);
    },
    caseStatus: function(status){
        switch(status) {
          case 0 : 
            return "Chưa duyệt" 
          case 1 : 
            return "Đã duyệt" 
          case 2 : 
            return "Đã giao"
          default : 
            return "Chưa duyệt"
        }
    },
    caseSeletedStatus: function(status,check){
      if (status ==check) {
        return "selected"
      }
      return ""
    },
   
}}))

app.set('views', path.join(__dirname,'resources/views'))
app.set('view engine', 'hbs')

// connect db
db.connect()

// cấu hình router
route(app)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
