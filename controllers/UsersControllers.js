const UsersModel = require('../model/UsersModel')
const mongoose = require('mongoose')

const { body, validationResult } = require('express-validator');


const firstUser = async (req, res) => {
    const user = await UsersModel.find({created_by : req.params.id})
    res.json(user)
}

const singleUser = async (req, res) => {
    const id = req.params.id
    if(mongoose.Types.ObjectId.isValid(id)){
        const user = await UsersModel.find({_id : id})
            if(!user) {
                res.status(404)
            }
            res.status(200).json(user[0])
    }else{
        res.status(404)
    }

}


    function getBmi(weight, height){
        let bmi = weight / (height * height)
        bmi = bmi * 10000
        bmi = bmi.toFixed(1)
        return bmi
    }

    function getCalorie (weight, height, gender, activity, age) {
        let totalCalories = 1.1 * (13.397 * weight + (4.799 * height) - (5.677 * age) + 88.362)
            console.log(weight, height, gender, activity, age)
        if (weight < 1 || height === 0 || 80 < age || age < 15) {
            res.status(404).send("les champs sont pas rempli OU l'un des champs est pas rempli")
        } else if (gender === 'homme' && activity === 1) {
            totalCalories = 1.2 * (13.397 * weight + (4.799 * height) - (5.677 * age) + 88.362)
            console.log("1 ==> Men", totalCalories)
        } else if (gender === 'homme' && activity === 2) {
            totalCalories = 1.3 * (13.397 * weight + (4.799 * height) - (5.677 * age) + 88.362)
            console.log("2 ==> Men", totalCalories)
        } else if (gender === 'homme' && activity === 3) {
            totalCalories = 1.4 * (13.397 * weight + (4.799 * height) - (5.677 * age) + 88.362)
            console.log("3 ==> Men", totalCalories)
        } else if (gender === 'homme' && activity === 4) {
            totalCalories = 1.5 * (13.397 * weight + (4.799 * height) - (5.677 * age) + 88.362)
            console.log("4 ==> Men", totalCalories)
        }
        else if (gender === 'femme' && activity === 1){
            totalCalories =  1.2 * (9.247 * weight + (3.098 * height) - (4.330 * age) + 447.593)
            console.log("1 ==> Woman", totalCalories)
        }    else if (gender === 'femme' && activity === 2){
            totalCalories =  1.3 * (9.247 * weight + (3.098 * height) - (4.330 * age) + 447.593)
            console.log("2 ==> Woman", totalCalories)
        }    else if (gender === 'femme' && activity === 3){
            totalCalories =  1.4 * (9.247 * weight + (3.098 * height) - (4.330 * age) + 447.593)
            console.log("3 ==> Woman", totalCalories)
        }    else if (gender === 'femme' && activity === 4){
            totalCalories =  1.5 * (9.247 * weight + (3.098 * height) - (4.330 * age) + 447.593)
            console.log("4 ==> Woman", totalCalories)
        }
        else {
            totalCalories = null
        } 
        return totalCalories.toFixed(1)

    }


    function getIdealWeight (height, gender) {
            let idealWeight = 0 
        if (gender === "" || height < 0 ){
            console.log("error")
        } else if (gender === "homme"){
            idealWeight = height - 100 - ((height - 150) / 4)
            console.log('Men ====> ',  idealWeight)
        } else if (gender === "femme"){
            idealWeight = height - 100 - ((height - 150) / 2.5)
            console.log('Femme ==> ', idealWeight)
        } else {
            idealWeight = null
        }
        return idealWeight

    }

const postUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() })
        } else{
// Récupération des donnnées
        const weight = parseFloat(req.body.weight)
        const gender = req.body.gender
        const height = parseFloat(req.body.height)
        const age = parseFloat(req.body.age)
        const activity = parseFloat(req.body.activity)
        let text= ''
        // CALCULATEUR DE BMI
        const bmi = getBmi(weight, height)
        if (bmi < 19) {
            text = "You are Underweight!"
        } else if (19 <= bmi && bmi < 25) {
            text = "You are Normalweight!"
        } else if (25 <= bmi && bmi < 30) {
            text = "You are Overweight!!"
        } else {  
           text = `You are Obese!`
        }

        // Calculateur de calorie journalier avec activity ou pas
            console.log(weight, height, gender, activity, age)
        const totalCalories = getCalorie(weight, height, gender, activity, age)

        // Calculateur du poids idéal selon le sexe 

        const idealWeight = getIdealWeight(height, gender)

        const newUser = await new UsersModel({ weight, gender, height, age, activity, totalCalories, bmi, idealWeight})
        newUser['created_by'] = req.body._id
        await newUser.save();
        if (newUser) {
            res.status(200).json({result : {
                totalCalories : totalCalories,
                BMI : bmi,
                idealWeight : idealWeight,
            }})
        }
    }
    } catch (err) {
        console.log(err)
        res.status(500).send('Les info sont pas bon')
    }
}


const resultUser = async (req, res) => {
    const slug = req.params.slug
   const user = await UsersModel.findOne({slug : slug})
   if(!user){
    res.status(400).send({message : "le serveur a pas trouver l'info de votre requete "})
}
res.status(200).json({
    user : {
        bmi : user.bmi,
        totalCalories : user.totalCalories,
        idealWeight : idealWeight,
    }
})
}

const patchUser = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ errors: errors.array() })
    } else{
    const body = req.body
    const id = req.params.id
    console.log(body)
    body["bmi"] = getBmi(body.weight, body.height)
    body['totalCalories'] = getCalorie(body.weight, body.height, body.gender, body.activity, body.age, )
    body['idealWeight'] = getIdealWeight(body.height, body.gender)

    const user = await UsersModel.findByIdAndUpdate(id, body )
    await user.save()
    console.log(user)
    if(!user){
        res.status(400).send({message : "le serveur a pas udapte la page "})
    }
    res.status(200).json(user)
}
}


const deleteUser = async (req, res, next) => {
    const id = req.params.id
    const user = await UsersModel.findByIdAndDelete({_id : id})
    if(!user){
        res.status(500).send({message : 'Le serveur a pas supprimer votre page'})
    }
    res.status(200).json(user)

}

module.exports = { firstUser, singleUser, postUser, resultUser, patchUser, deleteUser}