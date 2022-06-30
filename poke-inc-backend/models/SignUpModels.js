const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    middleName:{
        type: String,
        required:false
    },
    lastName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('user', signUpTemplate)

