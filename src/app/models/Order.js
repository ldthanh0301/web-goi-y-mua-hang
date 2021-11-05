const mongoose = require('mongoose');
const {Schema} = mongoose;

const Order = new Schema({
    name: String,
    address: String,
    phoneNumber: String,
    status: Number,
    totalPrice: Number,
    quantity: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: String
            }
        }
    ],
},{
    timestamps: true
});

Order.path('_id'); // ObjectId { ... }

module.exports =  mongoose.model('Order', Order);
