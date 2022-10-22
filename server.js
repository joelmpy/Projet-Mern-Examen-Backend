require('dotenv').config()
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('./config/passport')

// Route // 

const PassportRoute = require('./routes/PassportRoute');
const UserRoute = require('./routes/UsersRoute')

// Milldawares // 

const app = express();

mongoose.connect('mongodb://localhost:27017/Calorie')

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'MyAwesomeSecret',
    resave: true,
    saveUninitialized: false 
  }))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', PassportRoute);
app.use('/', UserRoute)




const PORT = process.env.PORT || 8009 
app.listen(PORT, err => {
    if (err) {
        return console.log('ERROR', err)
    }
        return console.log('Listen my port ', PORT)
})