const mongoose = require('mongoose');
const validator = require('validator')

const User = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type : String,
        required : true , 
        minlength : 7,
        trim : true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age : {
        type : Number,
        default : 0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be positive number")
            }
        }
    }
})
var Users =  mongoose.model('users' , User)
module.exports = {Users}