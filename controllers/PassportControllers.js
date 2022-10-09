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

const CreateUser = async (req, res, next) => { 

    const user = await new PassportModel(req.body)
    try {
        await user.save()
        if(!user) {
            console.log('bisdache')
            res.send('Errreur Post')
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).send('Error post')
    }
}

module.exports = {
    firstPassport,
    CreateUser,
    SingleUser
}