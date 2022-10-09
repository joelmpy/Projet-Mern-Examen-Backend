const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserModel = require('../model/PassportModel')
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
},
    function (username, password, done) {
        UserModel.findOne({ username }, function (err, user) {
            if (err) {
                done(err)
            }
            if (!user) {
                done(null, false)
            }
            bcrypt.compare(password, user.password).then(isTrue => {
                if (!isTrue) {
                    return done(null, false)
                }
                return done(null, user);
            })
        })
    }

))




passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id)
    done(null, user)
})

module.exports = passport