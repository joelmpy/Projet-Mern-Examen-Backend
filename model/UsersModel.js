const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    gender: {
        type: String,
        required : true,
        trim : true,
        lowercase : true
    },
    age: {
        type: Number,
        required : true,
        min: 15,
        max: 70,
        default: 15,
        validate: value => {
            if (value < 15) {
                throw new Error('Son age est inférieur a 15ans')
            }
            else if (value > 70) {
                throw new Error('Son age est supérieur a 70')
            }
        }
    },
    weight: {
        type: Number,
        required : true,
        min: 30,
        max: 300,
        validate: value => {
            if (value < 30) {
                throw new Error('Son poids est inférieur a 30kg')
            }
            else if (value > 300) {
                throw new Error('Son poids est supérieur a 300')
            }
        }
    },
    height: {
        type: Number,
        required : true,
        max: 250,
        validate: value => {
            if (value > 250) {
                throw new Error('Sa taille est inférieur a 250cm')
            }
        }
    },
    activity : {
        type : String,
        required : true,
        trim : true,
        lowercase : true
    }

})


const UserModel = mongoose.model('UserInfo', UserSchema)

module.exports = UserModel