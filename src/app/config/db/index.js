const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/web-goi-y-mua-hang');
        console.log('Connnection successful');
    } catch (error) {
        console.log('Connnection not success');
    }
}

module.exports = { connect };
