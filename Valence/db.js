const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://user:parola@cluster0.zjbdyu0.mongodb.net/ValenceReserve'

mongoose.connect(mongoURL,{useUnifiedTopology : true , useNewUrlParser : true})

var connection = mongoose.connection

connection.on('error' , () => {
    console.log('Mongo DB connection failed')
})

connection.on('connected' , () =>{
    console.log('Mongo DB connection succesfull')
})

module.exports = mongoose



