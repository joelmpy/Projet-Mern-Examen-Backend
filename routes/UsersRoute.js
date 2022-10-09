const express = require('express');
const route = express.Router();
const {firstUser, singleUser, postUser} = require('../controllers/UsersControllers')


// get all // 
route.get('/info', firstUser)
// get one // 
route.get('/info/:id', singleUser)
// POST // 
route.post('/info', postUser)
// Patch // 

// Delte // 


module.exports = route