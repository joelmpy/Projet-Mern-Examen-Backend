const express = require('express');
const route = express.Router();
const {firstUser, singleUser, postUser, patchUser, deleteUser, resultUser} = require('../controllers/UsersControllers');
const UserModel = require('../model/UsersModel');
const { body, validationResult } = require('express-validator');


// get one // 
route.get('/info/:id', singleUser)
// get all // 
route.get('/infos/:id', firstUser)
// POST // 
route.post('/info',
body('weight',).isFloat({ min: 30, max:300 }).withMessage('Le poids doit etre  entre 30 et 300 kg')
, postUser)
// Result GET // 
route.get('/info/:slug/bmi', resultUser)
// Patch // 
route.patch('/info/:id',
body('weight').isFloat({min:30, max:300}).withMessage('Le poids doit etre  entre 30 et 300 kg')
, patchUser)
// Delte // 
route.delete('/info/:id', deleteUser)





module.exports = route

