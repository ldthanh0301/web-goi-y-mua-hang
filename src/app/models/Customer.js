const mongoose = require('mongoose');
const {Schema} = mongoose;

const Customer = new Schema({
    fullname:  String, 
    phoneNumber: String,
    address:   Array,
    username: String,
    password: String
},{
    timestamps: true
});

Customer.path('_id'); // ObjectId { ... }

module.exports =  mongoose.model('Customer', Customer);
