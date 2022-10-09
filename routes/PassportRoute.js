const express = require('express');
const route = express.Router()
const expressValidator = require("express-validator");
const {firstPassport,SingleUser, CreateUser} = require('../controllers/PassportControllers')


// first route Passport all// 
route.get('/json', firstPassport )

// first route Passport SingleUser //

route.get('/json/:id', SingleUser)


// Passport Register Method POST //
route.post('/register',expressValidator.body("password").isLength({ min: 8 }) ,CreateUser )


// Passport Login Method POST

route.post('/login', )

module.exports = route