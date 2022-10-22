const PassportModel = require('../model/PassportModel');
const passport = require('../config/passport');
const bcrypt = require('bcrypt');


const firstPassport = async (req, res, next) => {
    const user = await PassportModel.find({})
    res.json(user)
}

const SingleUser = async (req, res, next) => {
    const user = await PassportModel.findById({_id : req.params.id})
    res.json(user)
}

const CreateUser =  async (req, res, next) => {
        console.log(req.user)
        res.json({
            massage: "Signup Ok",
            user: req.user,
            username : req.user.username,
            email : req.user.email,
            password: req.user.password,
            aboutMe: req.user.aboutMe,
            registrationDate: req.user.registrationDate,
        })
    }



module.exports = {
    firstPassport,
    CreateUser,
    SingleUser
}