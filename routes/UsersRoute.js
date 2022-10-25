const express = require('express');
const route = express.Router();
const {firstUser, singleUser, postUser, patchUser, deleteUser, resultUser} = require('../controllers/UsersControllers');
const UserModel = require('../model/UsersModel');


// get one // 
route.get('/info/:id', singleUser)
// get all // 
route.get('/info', firstUser)
// POST // 
route.post('/info', postUser)
// Result GET // 
route.get('/info/:slug/bmi', resultUser)
// Patch // 
route.patch('/info/:id', patchUser)
// Delte // 
route.delete('/info/:id', deleteUser)





module.exports = route

