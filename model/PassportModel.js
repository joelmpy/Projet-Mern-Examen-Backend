const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const PassportSchema = new mongoose.Schema({
    
    firstname: {
        type: String,
        trim: true,
    },
    surname : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 6,
    },
    aboutMe: {
        type: String,
        max: 160,
    },
    picture: {
        type : String,
        default: "../img/default.png" 
    },
    dateOfBirth: {
        type: Date,
        default: Date.now
    }
})

// PassportSchema.pre('save', async function (next) {
//     const user = this
//     const hash = await bcrypt.hash(user.password, 10)
//     user.password = hash
//     next()
// })

// PassportSchema.methods.isValidPassword = async function (password) {
//     const user = this
//     // compare le mots passe avec le user
//     const isSame = await bcrypt.compare(password, user.password)
//     return isSame // return true ou false
// }
const PassportModel = mongoose.model('User', PassportSchema );

module.exports = PassportModel