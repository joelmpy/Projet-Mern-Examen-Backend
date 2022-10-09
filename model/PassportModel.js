const mongoose = require('mongoose');

const PassportSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 6,
    },
    aboutMe: {
        type: String,
        required: true,
        max: 160,
    },
    picture: {
        type : String,
        default: "../img/default.png" 
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
})

const PassportModel = mongoose.model('User', PassportSchema );

module.exports = PassportModel