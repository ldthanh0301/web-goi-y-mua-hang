const mongoose = require('mongoose');
const {Schema} = mongoose;

const User = new Schema({
    fullname:  String, 
    phoneNumber: String,
    address:   String,
    email:   String,
    username: {
        type: String,
        unique: true,
    },
    password: {
        type:String,
    }
},{
    timestamps: true
});

User.path('_id'); // ObjectId { ... }

module.exports =  mongoose.model('User', User);
