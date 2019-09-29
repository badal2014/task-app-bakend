// --------------------SCHEMA------------------------
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Task = require('./tasks');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        // minlength : 7,
        // trim : true,
    },
    age: {
        type: Number,
        default: 0,

    },
    tokens : [{
        token : {
                type : String,
                required : true
        }
    }]
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject =  user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id : user._id.toString()} , process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token;
}

userSchema.statics.findByCredentials = async (email , password) => {
    const user = await User.findOne({email})
    // console.log("uasdgf" , user)
    // console.log(!user)
    if(!user){
        res.send("unable To Login")
        throw new Error("Unable to Login")
    }
    // const isMatch = await bcrypt.compare(password , user.password)
    const isMatch = await User.findOne({password})
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user
}

// userSchema.pre('save', async function (next) {
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })

// Delete user taks when user is deleted

userSchema.pre('remove' , async function(next) {
    const user = this
    await Task.deleteMany({owner : user._id})
    next()
})

var User = mongoose.model('users', userSchema);

module.exports = User;
