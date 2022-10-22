const express = require('express');
const route = express.Router()
const expressValidator = require("express-validator");
const { body, validationResult } = require('express-validator');
const {firstPassport,SingleUser, CreateUser} = require('../controllers/PassportControllers')
const passport = require('passport')


// first route Passport all// 
route.get('/json', firstPassport )

// first route Passport SingleUser //

route.get('/json/:id', SingleUser)


// Passport Register Method POST //
route.post('/signup', passport.authenticate('signup', { session: false }) ,async (req, res, next) => {
    // console.log(req.user)
    res.json({
        massage: "Signup Ok",
        user: req.user,
    })
}
)


// Passport Login Method POST

route.post(
    '/login', 
    body('email').trim().isEmail().normalizeEmail(),
    (req, res, next) => {
        passport.authenticate('login', (err, user) => {
            if(err || !user){
                res.status(400).json({
                    success: false,
                    message: 'Unauthorized',
                });
            } else {
                req.user = user
                next()
            }
        }) (req, res, next)
    }, (req, res) => {
        req.login(req.user, (err) => {
            if(err){
                res.status(500).json({
                    succes : false,
                    message : 'An error occurred while processing your request',
                })
            } else {
                res.json({
                    succes : true,
                    user : {
                       email : req.user.email,
                       password: req.user.password,
                       firstname : req.user.firstname,
                       surname : req.user.surname,
                    }
                })
            }
        })
    }
    )

module.exports = route