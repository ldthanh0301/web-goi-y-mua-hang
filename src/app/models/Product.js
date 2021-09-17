const mongoose = require('mongoose');
const {Schema} = mongoose

const Product = new Schema({
    name:  String, // String is shorthand for {type: String}
    desription: String,
    image:   String,
    price: Number,
    value: Number
},{
    timestamps: true
});

Product.path('_id'); // ObjectId { ... }

module.exports =  mongoose.model('Product', Product);