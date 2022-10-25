const UsersModel = require('../model/UsersModel')

const firstUser = async (req, res) => {
    const user = await UsersModel.find({})
    res.json(user)
}

const singleUser = async (req, res) => {
    const user = await UsersModel.findById({ _id: req.params.id })
    res.json(user)
    console.log(user)
}


    function getBmi(weight, height){
        let bmi = weight / (height * height)
        bmi = bmi * 10000
        bmi = bmi.toFixed(1)
        return bmi
    }

    function getCalorie (weight, height, gender, activity, age) {
        let totalCalories = 1.1 * (13.397 * weight + (4.799 * height) - (5.677 * age) + 88.362)
        
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
        return totalCalories

    }

const postUser = async (req, res, next) => {
    try {

        //  Recuperation de mes données //

        const weight = parseFloat(req.body.weight)
        const gender = req.body.gender
        const height = parseFloat(req.body.height)
        const age = parseFloat(req.body.age)
        const activity = parseFloat(req.body.activity)
        const text= ''
        // CALCULATEUR DE BMI
        const bmi = getBmi(weight, height)
        if (bmi < 19) {
            text = "You are Underweight!"
          console.log("You are Underweight!", bmi) 
        } else if (19 <= bmi && bmi < 25) {
            console.log(bmi, "You are Normalweight!");
        } else if (25 <= bmi && bmi < 30) {
         console.log(bmi, "You are Overweight!") 
        } else {
            console.log('You are Obese!', bmi)            
        }

        // Calculator de calorie journalier avec activity ou pas
        
        const totalCalories = getCalorie(weight, height, gender, activity, age)
        const newUser = await new UsersModel({ weight, gender, height, age, activity, totalCalories, bmi})
        await newUser.save();
        if (newUser) {
            res.status(200).json({result : {
                totalCalories : totalCalories,
                BMI : bmi,
                text : text
            }})
        }
    } catch (err) {
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
    }
})
}

const patchUser = async (req, res, next) => {
    const body = req.body
    const id = req.params.id
    body["bmi"] = getBmi(body.weight, body.height)
    body['totalCalories'] = getCalorie(body.weight, body.height, body.gender, body.activity, body.age, )
    const user = await UsersModel.findByIdAndUpdate(id, body )
    await user.save()
    console.log(user)
    if(!user){
        res.status(400).send({message : "le serveur a pas udapte la page "})
    }
    res.status(200).json(user)
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