const mongoose = require('mongoose');
const {Schema} = mongoose;

const Staff = new Schema({
    fullname:  String, 
    phoneNumber: String,
    address:   String,
    position:   String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required: true
    }
},{
    timestamps: true
});

Staff.path('_id'); // ObjectId { ... }

module.exports =  mongoose.model('Staff', Staff);
