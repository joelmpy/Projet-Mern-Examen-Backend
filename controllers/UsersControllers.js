const UsersModel = require('../model/UsersModel')

const firstUser = async (req, res) => {
    const user = await UsersModel.find({})
    res.json(user)
}

const singleUser = async (req, res) => {
    const user = await UsersModel.findById({_id : req.params.id})
    res.json(user)
}

const postUser = async (req, res, next) => {
    const newUser = await new UsersModel(req.body)

    try {
       await newUser.save();
       if(newUser){
        res.status(200).json(newUser)
       }
    } catch (err){
        res.status(500).send('Les info sont pas bon')
    }
}

module.exports = {firstUser, singleUser, postUser}