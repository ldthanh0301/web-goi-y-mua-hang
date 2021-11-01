const mongoose = require('mongoose');
const {Schema} = mongoose;

const Order = new Schema({
    customerId:  String, 
    detail: String,
    status: Number
},{
    timestamps: true
});

Order.path('_id'); // ObjectId { ... }

module.exports =  mongoose.model('Order', Order);
