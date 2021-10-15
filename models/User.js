const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 40
    },
    email: {
        type: String,
        required: true,
        min:  10,
        max: 200
    },
    password: {
        type: String,
        required: true,
        min: 8
    }
});

module.exports = mongoose.model('User', userSchema);
