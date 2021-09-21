const mongoose = require('mongoose');
const {Schema} = mongoose

const Product = new Schema({
    name:  String, // String is shorthand for {type: String}
    description: String,
    image:   String,
    price: Number,
    value: Number,
    slug: String
},{
    timestamps: true
});

Product.path('_id'); // ObjectId { ... }
Product.index({name: 'text'});
module.exports =  mongoose.model('Product', Product);