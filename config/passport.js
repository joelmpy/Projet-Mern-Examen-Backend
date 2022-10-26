const passport = require('passport');
const LocalStrategy = require('passport-local');
const PassportModel = require('../model/PassportModel')
const bcrypt = require('bcrypt');


// passport.use(
//     'signup', 
//     new LocalStrategy({
//         usernameField: "email",
//         password: "password",
//     }, async (email, password, done) => {
//         try {
//             console.log("email", email)
//             console.log("password", password)
//             const user = await PassportModel.create({email, password});
//             if (!user) {
//                 return done(null, false)
//             }
//             const isSame = await bcrypt.compare(password, user.password);
//             if (!isSame) {
//                 return done(null, false)
//             }
        
//             done(null, user)
//         } catch (error) {
//             return done(error)
//         }

//     })
// )
passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async (email, password, done) => {
            try {
                const user = await PassportModel.findOne({ email })
                console.log(user)
                // je verife si il y a un utilsateur sauvgarder ou pas//
                if (!user) {
                    return done(null, false, { message: "Utilsateur non trouvé" })
                }
                // je verife si le mots de passe est bon ou pas
                const match = await bcrypt.compare(password, user.password);
                console.log(match)
                if (!match) {
                    console.log('okk')
                    return done(null, false, { message: 'Error de connexion' })
                }

                // je return si tout est bon l'user avce la conexion reussi 
                return done(null, user, { message: 'Connexion reussi' })

            }
            catch (error) {
                return done(error)
            }
        })
)


passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await PassportModel.findById(id)
    done(null, user)
})

module.exports = passport