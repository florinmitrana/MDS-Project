const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
    name : {
        type: String
    },
    speciality : {
        type: String
    },
    capacity :{
        type: Number
    },
    phonenumber:{
        type: String
    },
    imageurls : [],
    currentbookings : [],
    description :{
        type: String
    }

}, {
    timestamps : true,
})

const restaurantModel = mongoose.model('restaurants', restaurantSchema)

module.exports = restaurantModel