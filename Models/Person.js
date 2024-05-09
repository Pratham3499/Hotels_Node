const mongoose = require('mongoose');

personSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['Chef', 'Waiter', 'Manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
})


const bcrypt = require('bcryptjs');

personSchema.pre('save', async function(next){
    const person = this;

    if(!person.isModified('password')){
        return next();
    }
    else{
        try {
            
            const salt = await bcrypt.genSalt(10)
             const hashPassword = await bcrypt.hash(person.password, salt)
            console.log('Before Adding Salt Password is: ', person.password, 'Salt is', salt, ' hashPassword is: ', hashPassword)
            person.password = hashPassword;
            console.log('After Adding Salt Password is: ', person.password, 'Salt is', salt, ' hashPassword is: ', hashPassword)
        } catch (error) {
            console.log(error.message)
            throw error;
            return next(error);
        
        }
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
   
    try {
        console.log(candidatePassword)
        console.log(this.password)
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;

    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model('Person', personSchema, 'personsTable')
module.exports = Person;