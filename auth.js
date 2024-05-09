const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./Models/Person')
passport.use(new localStrategy(async (usr, pwd, done) => {
    try {
        const user = await Person.findOne({ username: usr })
        if (!user) {
             
            return done(null, false, { message: 'User not found for passport' })
        }

      //  const isPasswordMatched = user.password === pwd ? true : false;
        const isPasswordMatched = await user.comparePassword(pwd)
console.log(isPasswordMatched)
        if (isPasswordMatched) {
            console.log('UserName is :', usr)
            console.log('Password is :', pwd)
             return done(null, true, { message: `Password got:${pwd}` })
     
        } else {
            return done(null, false, { message: 'Incorrect Password' })
        }
    } catch (error) {
        console.log('I am from catch block of passport.use with error:', error.message)
        return done(error)
    }
}))

passport.use(passport.initialize());
module.exports = passport