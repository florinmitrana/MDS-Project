const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    isAdmin:{
        type: Boolean, default: false
    }


},{
    timestamps : true,
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel