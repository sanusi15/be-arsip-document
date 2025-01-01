const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is Required']
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
    position: {
        type: String,
    },
    level: {
        type: String,
        default: 'member'
    }
}, {timestamps: true})

module.exports = mongoose.model('Users', userSchema)

