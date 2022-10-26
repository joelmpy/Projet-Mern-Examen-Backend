const express = require('express');
const route = express.Router()
const expressValidator = require("express-validator");
const { body, validationResult } = require('express-validator');
const { firstPassport, SingleUser, CreateUser } = require('../controllers/PassportControllers')
const passport = require('passport')
const PassportModel = require('../model/PassportModel')
const bcrypt = require('bcrypt')

// first route Passport all// 
route.get('/json', firstPassport)

// first route Passport SingleUser //

route.get('/json/:id', SingleUser)



route.post('/signup',
    body('email',).trim().isEmail().normalizeEmail(),
    body('password',).trim().isLength({ min: 5 }).withMessage('password must be at least 5 characters'),
    async (req, res) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })

        } else {
            req.body['password'] = await bcrypt.hash(req.body.password, 10)
            console.log(req.body)
            const user = new PassportModel(req.body)
            user.save().then(data => {
                res.json(user)
            })

        }
    }


)

// route.post('/signup', async (req, res, next) => {
//     req.body['password'] = await bcrypt.hash(req.body.password, 10)
//     console.log(req.body)
//     const user = new PassportModel(req.body)
//     user.save().then(data=>{
//         res.json(user)
//     })
// })


// Passport Login Method POST



route.post('/login', (req, res, next) => {

    passport.authenticate('local'), (req, res) => {
        if (req.user) {
            req.logIn(req.user, (err) => {
                res.status(200).json({ message: req.user })
            })
        }
        else {
            res.status(404).json({ message: 'pas trouvé', Succes: 'pas de connexion possible' })
        }
    }
})


module.exports = route 