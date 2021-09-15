const express = require('express')
const route = require('./routes/index.route')
const exphbs  = require('express-handlebars');
const path = require('path');

const app = express()
const port = 3000
const hbs = exphbs.create();

// set view engine là handlebars
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname,'resources/views'))
console.log(__dirname)
app.set('view engine', 'handlebars');

// cấu hình router
route(app)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
