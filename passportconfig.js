const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByName, getUserById){
    const authenticateUser = async (username, password, done) =>{
        const user = await getUserByName(username)
        console.log(user)
        if (user == null){
            return done(null, false)
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                console.log("Authed")
                return done(null, user)
            } else{
                return done(null, false)
            }
        } catch(e){
            return done(e)
        }
    }
passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'}, authenticateUser))
passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((id, done) => done(null, getUserById(id)))
}
module.exports = initialize